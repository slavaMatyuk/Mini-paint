import { ImgActionTypes, ImageType, User } from '../interfaces';

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

export const saveImage = (imagePath: string, imageURL: string) => ({
  type: ImgActionTypes.SAVE_IMAGE,
  imagePath,
  imageURL,
});

export const uploadImage = (imagePath: string, imageURL: string) => ({
  type: ImgActionTypes.UPLOAD_IMAGE,
  imagePath,
  imageURL,
});

export const createImageInstanceInDB = (user: User, imageURL: string, imageId: number, imagePath: string) => ({
  type: ImgActionTypes.CREATE_IMAGE_INSTANCE_IN_DATABASE,
  user,
  imageURL,
  imageId,
  imagePath,
});
