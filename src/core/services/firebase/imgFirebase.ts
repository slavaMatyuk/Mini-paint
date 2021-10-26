import firebase, { db, storage, storageRef } from '../../configs/firebase';

interface docState {
  data: () => never;
}

export const fetchAllImages = async () => {
  const data: [] = [];
  console.log(`show me init data: ${data}`);
  const fetchImages: any = await db.collection('users').get();
  console.log(`show me the fetchImages: ${fetchImages}`);
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
  console.log(`1 - Покажи path: ${path}`);

  const imgRef = storageRef.child(path);
  console.log(`2 - Покажи ImgRef: ${imgRef}`);

  await imgRef.putString(dataUrl, 'data_url');
  console.log(`2.2 - Покажи ImgRef putString: ${imgRef}`);

  const imgUrl = await imgRef.getDownloadURL();
  console.log(`3 - Покажи imgUrl: ${imgUrl}`);

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
