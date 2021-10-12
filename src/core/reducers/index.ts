import { combineReducers } from 'redux';
import authReducer from './authReducer';
import imageContainerReducer from './imageContainerReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  images: imageContainerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
