/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ImageType, User } from '../../interfaces';
import { db, storage } from './index';

export async function fetchAllImages() {
  const imagesRef = db.collection('library');
  const res = await imagesRef.get();
  return res;
}

export async function createNewImageReferenceInDB(
  user: User,
  imageURL: ImageType,
  imageId: ImageType,
  imagePath: ImageType
) {
  const newImageRef = db.collection('library').doc(`${imageId}`);
  const res = await newImageRef.set({
    userEmail: user?.email,
    imageURL,
    imageId,
    imagePath,
  });
  return res;
}

export async function deleteImageInStorage(imagePath: ImageType) {
  const res = await storage.ref().child(`${imagePath}`).delete();
  return res;
}

export async function deleteImageInDatabase(imageId: ImageType) {
  const res = await db.collection('library').doc(`${imageId}`).delete();
  return res;
}

export async function loadImageToStorage(imagePath: string, imageURL: string) {
  const res = await storage.ref().child(imagePath).putString(imageURL, 'data_url');
  return res;
}

export async function getNewImageURL(userId: string, date: number) {
  const res = await storage.ref(`library/${userId}/photo${date}.png`).getDownloadURL();
  return res;
}
