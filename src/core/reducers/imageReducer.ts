import {
  SET_DATA_URL,
  GET_ALL_IMAGES_FROM_DB,
  SORT_IMAGES,
  GET_USER_IMAGES_FROM_DB,
  DEL_USER_IMAGE_FROM_DB,
  SAVE_IMAGE_SUCCEEDED,
  SAVE_IMAGE_FAILED,
  GET_ALL_IMAGES_FROM_DB_SUCCEEDED,
  GET_ALL_IMAGES_FROM_DB_FAILED,
  DEL_USER_IMAGE_FROM_DB_SUCCEEDED,
  DEL_USER_IMAGE_FROM_DB_FAILED,
  GET_USER_IMAGES_FROM_DB_SUCCEEDED,
  GET_USER_IMAGES_FROM_DB_FAILED,
} from '../actions/imageContainerActions';

interface ImageAction {
  payload: [],
  type: string,
  id: number | null,
  data: {}
  dataUrl: string,
  imgUrl: string | null
  imgName: number,
  userName: string,
}

export interface ImageState {
  loading: boolean,
  error: boolean,
  deleteWithID: number | null,
  deleteWithURL: string | null,
  subContexDataUrl: string,
  imageName: string,
  imagesProfData: [],
  imagesData: [],
  sortedImagesData: [],
}

const initialState: ImageState = {
  loading: false,
  error: false,
  deleteWithID: null,
  deleteWithURL: null,
  subContexDataUrl: '',
  imageName: '',
  imagesProfData: [],
  imagesData: [],
  sortedImagesData: [],
};

export const imageReducer = (state = initialState, action: ImageAction): object => {
  switch (action.type) {
    case SET_DATA_URL:
      return {
        ...state,
        subContexDataUrl: action.dataUrl,
        error: false,
      };

    case SAVE_IMAGE_SUCCEEDED:
      return {
        ...state, loading: false, error: false,
      };
    case SAVE_IMAGE_FAILED:
      return {
        ...state, loading: false, error: true,
      };
    case GET_ALL_IMAGES_FROM_DB:
      return {
        ...state, loading: true, error: false,
      };
    case GET_ALL_IMAGES_FROM_DB_SUCCEEDED:
      return { ...state, imagesData: action.payload };
    case GET_ALL_IMAGES_FROM_DB_FAILED:
      return {
        ...state, loading: false, error: true,
      };
    case SORT_IMAGES:
      return { ...state, sortedImagesData: action.data };
    case DEL_USER_IMAGE_FROM_DB:
      return { ...state, loading: true, deleteWithURL: action.imgUrl };
    case DEL_USER_IMAGE_FROM_DB_SUCCEEDED:
      return {
        ...state,
        imagesProfData: state.imagesProfData.filter((img: {id: string | number}) => img.id !== state.deleteWithID),
        loading: false,
        deleteWithID: null,
      };
    case DEL_USER_IMAGE_FROM_DB_FAILED:
      return { ...state, loading: false };
    case GET_USER_IMAGES_FROM_DB:
      return {
        ...state, loading: true, error: false,
      };
    case GET_USER_IMAGES_FROM_DB_SUCCEEDED:
      return { ...state, loading: false, imagesProfData: action.payload };
    case GET_USER_IMAGES_FROM_DB_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default imageReducer;
