export const GET_USER_NAME = 'IMAGE/GET_USER_NAME';
export const GET_USER_ID = 'IMAGE/GET_USER_ID';
export const GET_USER_IMAGES_FROM_DB = 'IMAGE/GET_USER_IMAGES_FROM_DB';
export const DEL_USER_IMAGE_FROM_DB = 'IMAGE/DEL_USER_IMAGE_FROM_DB';
export const GET_ALL_IMAGES_FROM_DB = 'IMAGE/GET_ALL_IMAGES_FROM_DB';
export const SORT_IMAGES = 'IMAGE/SORT_IMAGES';
export const SET_DATA_URL = 'IMAGE/SET_DATA_URL';

export const getUserNameAction = () => ({ type: GET_USER_NAME });

export const getUserIDAction = () => ({ type: GET_USER_ID });

export const getUserImagesFromDbAction = (userID: string, userName: string) => (
  { type: GET_USER_IMAGES_FROM_DB, userID, userName }
);

export const delUserImageFromDbAction = (id: number | null, userID:string, imgUrl: string | null, userName:string) => (
  {
    type: DEL_USER_IMAGE_FROM_DB, id, userID, imgUrl, userName,
  }
);

export const getAllImagesFromDbAction = () => ({ type: GET_ALL_IMAGES_FROM_DB });

export const sortImagesAction = (data: object) => ({ type: SORT_IMAGES, data });

export const setDataUrlAction = (dataUrl: string, userID: string, userName: string) => ({
  type: SET_DATA_URL, dataUrl, userID, userName,
});
