import { AuthState } from '../reducers/authReducer';
import { ImageState } from '../reducers/imageReducer';

export interface AppState {
  auth: AuthState,
  images: ImageState,
}

export interface DBcreateUserResponse {
  userID: string,
  userName: string,
  images: string[],
}
