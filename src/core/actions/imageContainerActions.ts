import { ImageType, User } from '../interfaces';

export const ImgActionTypes = {
  FETCH_IMAGES: 'FETCH_IMAGES',
  SET_IMAGES: 'SET_IMAGES',
  REMOVE_IMAGE: 'REMOVE_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  SAVE_IMAGE: 'SAVE_IMAGE',
  CREATE_IMAGE_INSTANCE_IN_DATABASE: 'CREATE_IMAGE_INSTANCE_IN_DATABASE',
};

export const fetchImages = () => ({
  type: ImgActionTypes.FETCH_IMAGES,
});

export const setImages = (images: ImageType[]) => ({
  type: ImgActionTypes.SET_IMAGES,
  payload: images,
});

export const removeImage = (imageId: number) => ({
  type: ImgActionTypes.REMOVE_IMAGE,
  payload: imageId,
});

export const deleteImage = (imagePath: string, imageId: number) => ({
  type: ImgActionTypes.DELETE_IMAGE,
  imagePath,
  imageId,
});

export const createImageInstanceInDB = (user: User, imageURL: string, imageId: number, imagePath: string) => ({
  type: ImgActionTypes.CREATE_IMAGE_INSTANCE_IN_DATABASE,
  user,
  imageURL,
  imageId,
  imagePath,
});
