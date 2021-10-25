export const GET_USER_NAME = 'IMAGE/GET_USER_NAME';
export const GET_USER_ID = 'IMAGE/GET_USER_ID';
export const GET_USER_IMAGES_FROM_DB = 'IMAGE/GET_USER_IMAGES_FROM_DB';
export const GET_USER_IMAGES_FROM_DB_SUCCEEDED = 'IMAGE/GET_USER_IMAGES_FROM_DB_SUCCEEDED';
export const GET_USER_IMAGES_FROM_DB_FAILED = 'IMAGE/GET_USER_IMAGES_FROM_DB_FAILED';
export const GET_ALL_IMAGES_FROM_DB = 'IMAGE/GET_ALL_IMAGES_FROM_DB';
export const GET_ALL_IMAGES_FROM_DB_SUCCEEDED = 'IMAGE/GET_ALL_IMAGES_FROM_DB_SUCCEEDED';
export const GET_ALL_IMAGES_FROM_DB_FAILED = 'IMAGE/GET_ALL_IMAGES_FROM_DB_FAILED';
export const SORT_IMAGES = 'IMAGE/SORT_IMAGES';
export const SET_DATA_URL = 'IMAGE/SET_DATA_URL';
export const SAVE_IMAGE_SUCCEEDED = 'IMAGE/SAVE_IMAGE_SUCCEEDED';
export const SAVE_IMAGE_FAILED = 'IMAGE/SAVE_IMAGE_FAILED';
export const DEL_USER_IMAGE_FROM_DB = 'IMAGE/DEL_USER_IMAGE_FROM_DB';
export const DEL_USER_IMAGE_FROM_DB_SUCCEEDED = 'IMAGE/DEL_USER_IMAGE_FROM_DB_SUCCEEDED';
export const DEL_USER_IMAGE_FROM_DB_FAILED = 'IMAGE/DEL_USER_IMAGE_FROM_DB_FAILED';

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

export const saveImageSucceededAction = () => ({ type: SAVE_IMAGE_SUCCEEDED });

export const saveImageFailedAction = (payload: {code: string, message: string} | unknown) => (
  { type: SAVE_IMAGE_FAILED, payload }
);

export const delUserImageFromDbSucceededAction = () => ({ type: DEL_USER_IMAGE_FROM_DB_SUCCEEDED });

export const delUserImageFromDbFailedAction = (payload: {code: string, message: string} | unknown) => (
  { type: DEL_USER_IMAGE_FROM_DB_FAILED, payload }
);

export const getUserImagesFromDbSucceededAction = (payload: [object] | unknown) => (
  { type: GET_USER_IMAGES_FROM_DB_SUCCEEDED, payload }
);

export const getUserImagesFromDbFailedAction = (payload: {code: string, message: string} | unknown) => (
  { type: GET_USER_IMAGES_FROM_DB_FAILED, payload }
);

export const getAllImagesFromDbSucceededAction = (payload: object | unknown) => (
  { type: GET_ALL_IMAGES_FROM_DB_SUCCEEDED, payload }
);

export const getAllImagesFromDbFailedAction = (payload: {code:string, message: string} | unknown) => (
  { type: GET_ALL_IMAGES_FROM_DB_FAILED, payload }
);
