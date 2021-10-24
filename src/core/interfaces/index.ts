import { AuthState } from '../reducers/authReducer';
import { ImageState } from '../reducers/imageReducer';

export interface AppState {
  auth: AuthState,
  image: ImageState,
}
