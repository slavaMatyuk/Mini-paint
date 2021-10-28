import firebase, { db, storageRef } from '../../configs/firebase';

export const fetchAllImages = async () => {
  const images: [] = [];
  const fetchImages = await db.collection('users');

  console.log(fetchImages); // TO REMOVE

  await fetchImages.get()
    .then((querySnapshot) => {
      let imagesAll: [] = [];
      querySnapshot.forEach((doc) => {
        doc.get(doc.id).then(((doc2: any) => {
          const payload = doc2.data();
          if (payload) {
            imagesAll = payload.images;
          }
          return imagesAll;
        }));
      });
    }).catch((error) => {
      console.log(`ERROR MESSAGE: ${error}`); // TO REMOVE
    });
  return images;
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
    images: firebase.firestore.FieldValue.arrayUnion({ imgUrl, id, userName }),
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
    images: firebase.firestore.FieldValue.arrayRemove({ id, imgUrl, userName }),
  });

  const path = `library/${userID}/photo:${id}`;
  const imgRef = storageRef.child(path);
  await imgRef.delete();
};
