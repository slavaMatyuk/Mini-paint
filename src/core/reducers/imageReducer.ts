import {
  SET_DATA_URL,
  GET_ALL_IMAGES_FROM_DB,
  SORT_IMAGES,
  GET_USER_IMAGES_FROM_DB,
  DEL_USER_IMAGE_FROM_DB,
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
  error: boolean,
  deleteWithID: number | null,
  deleteWithURL: string | null,
  subContexDataUrl: string,
  imageName: string,
  imagesData: [],
  sortedImagesData: [],
}

const initialState: ImageState = {
  error: false,
  deleteWithID: null,
  deleteWithURL: null,
  subContexDataUrl: '',
  imageName: '',
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
    case GET_ALL_IMAGES_FROM_DB:
      return { ...state, imagesData: action.payload };
    case SORT_IMAGES:
      return { ...state, sortedImagesData: action.data };
    case GET_USER_IMAGES_FROM_DB:
      return { ...state, imagesData: action.payload };
    case DEL_USER_IMAGE_FROM_DB:
      return {
        ...state,
        imagesData: state.imagesData.filter((img: {id: string | number}) => img.id !== state.deleteWithID),
        deleteWithID: null,
      };
    default:
      return state;
  }
};

export default imageReducer;
