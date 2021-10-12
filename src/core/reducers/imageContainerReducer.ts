import { ImgActionTypes, ImageStateType } from '../interfaces';

const initialState: ImageStateType = {
  images: [],
};

const imageContainerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ImgActionTypes.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case ImgActionTypes.REMOVE_IMAGE:
      return {
        ...state,
        images: state.images.filter((image) => image.imageId !== action.payload),
      };

    default:
      return state;
  }
};

export default imageContainerReducer;
