import firebase, { db, storage, storageRef } from '../../configs/firebase';

interface docState {
  data: () => never;
}

export const fetchAllImages = async () => {
  const data: [] = [];
  const fetchImages: any = await db.collection('users').get();
  fetchImages.docs.map((doc: docState) => data.push(doc.data()));
  return data;
};

export const fetchUserImages = async (userID: string) => {
  let images: [] = [];
  const imagesRef = await db.collection('users').doc(userID);
  await imagesRef.get().then((doc) => {
    if (doc.data()) {
      images = doc.data()?.images;
    }
  });
  return images;
};

export const saveImage = async (dataUrl: string, userID: string, userName: string, id: string) => {
  const path = `library/${userID}/photo:${id}`;
  const imgRef: {putString: (dataUrl: string, name: string) => void} = storageRef.child(path);

  await imgRef.putString(dataUrl, 'data_url');
  const imgUrl = await storage.refFromURL(`gs://${process.env.REACT_APP_STORAGE_BUCKET}/${path}`).getDownloadURL();

  const saveImageToDB = () => db.collection('users').doc(userID.toString()).update({
    images: firebase.firestore.FieldValue.arrayUnion({ imgUrl, id }),
  });

  db.collection('users').doc(userID.toString()).get().then((doc) => {
    if (doc.exists) {
      saveImageToDB();
    } else {
      db.collection('users').doc(userID.toString()).set({ userName });
      saveImageToDB();
    }
  });
};

export const deleteUserImage = async (id: string, userID: string, imgUrl: string) => {
  await db.collection('users').doc(userID.toString());
  db.collection('users').doc(userID.toString()).update({
    images: firebase.firestore.FieldValue.arrayRemove({ id, imgUrl }),
  });
  const path = `library/${userID}/photo:${id}`;
  const imgRef: {delete: () => void} = storageRef.child(path);
  await imgRef.delete();
};
