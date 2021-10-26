import firebase, { db, storageRef } from '../../configs/firebase';

interface docState {
  data: () => never;
}

export const fetchAllImages = async () => {
  const data: [] = [];
  const fetchImages: any = await db.collection('users').get();
  console.log(`все юзеры здесь: ${fetchImages}`);
  fetchImages.docs.map((doc: docState) => data.push(doc.data()));
  return data;
};

export const fetchUserImages = async (userID: string, userName: string) => {
  let images: [] = [];
  const imagesRef = await db.collection('users').doc(`${userID}`);
  await imagesRef.get().then((doc) => {
    const payload = doc.data();
    if (payload) {
      images = payload.images;
    }
    return images;
  });
  return images;
};

export const saveImage = async (dataUrl: string, userID: string, userName: string, id: string) => {
  const path = `library/${userID}/photo:${id}`;

  const imgRef = storageRef.child(path);

  await imgRef.putString(dataUrl, 'data_url');

  const imgUrl = await imgRef.getDownloadURL();

  const saveImageToDB = () => db.collection('users').doc(`${userID}`).update({
    images: firebase.firestore.FieldValue.arrayUnion({ imgUrl, id }),
  });

  db.collection('users').doc(`${userID}`).get().then((doc) => {
    if (doc.exists) {
      saveImageToDB();
    } else {
      db.collection('users').doc(`${userID}`).set({ userName });
      saveImageToDB();
    }
  });
};

export const deleteUserImage = async (id: string, userID: string, imgUrl: string, userName: string) => {
  await db.collection('users').doc(`${userID}`);
  db.collection('users').doc(`${userID}`).update({
    images: firebase.firestore.FieldValue.arrayRemove({ id, imgUrl }),
  });
  const path = `library/${userID}/photo:${id}`;
  const imgRef: {delete: () => void} = storageRef.child(path);
  await imgRef.delete();
};
