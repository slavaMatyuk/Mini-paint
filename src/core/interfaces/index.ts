import { InputHTMLAttributes } from 'react';

export const AuthActionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SIGN_IN_WITH_EMAIL: 'SIGN_IN_WITH_EMAIL',
  SIGN_UP_WITH_EMAIL_AND_PASSWORD: 'SIGN_UP_WITH_EMAIL_AND_PASSWORD',
  SIGN_OUT: 'SIGN_OUT',
  SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE',
};

export const ImgActionTypes = {
  FETCH_IMAGES: 'FETCH_IMAGES',
  SET_IMAGES: 'SET_IMAGES',
  REMOVE_IMAGE: 'REMOVE_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  SAVE_IMAGE: 'SAVE_IMAGE',
  CREATE_IMAGE_INSTANCE_IN_DATABASE: 'CREATE_IMAGE_INSTANCE_IN_DATABASE',
};

export type ImageType = {
  imageId: number;
  imagePath: string;
  imageURL: string;
  userEmail: string;
};

export type ImageStateType = {
  images: Array<ImageType>;
};

export type ImagePropsType = {
  image: ImageType;
};

export type RootStateType = {
  auth: AuthStateType;
  images: ImageStateType;
};

export type AuthStateType = {
  user: User;
  error: string | null;
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export type User = {
  email: string | null;
  uid: string | null;
  photo: string | null | undefined;
} | null;

export type CurrentUserType = () => void;
export type ErrorMessageType = () => void;
export type UserStateType = User | null;

export type ImageCreateType = {
  user: User;
  imageURL: string;
  imageId: number;
  imagePath: string;
};

export type ImageDeleteType = {
  imagePath: string;
  imageId: number;
};

export type ImageUploadType = {
  imagePath: string;
  imageURL: string;
};

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
}

export interface RegisterData {
  firstName: string;
  email: string;
  password: string;
}

export interface LogInData {
  email: string;
  password: string;
}

interface SetUserAction {
  type: typeof AuthActionTypes.SET_CURRENT_USER;
  payload: User;
}

interface LogOutAction {
  type: typeof AuthActionTypes.SIGN_OUT;
}

interface SetErrorAction {
  type: typeof AuthActionTypes.SET_ERROR_MESSAGE;
  payload: string;
}

export type AuthAction = SetUserAction | LogOutAction | SetErrorAction;
export type MouseEventType = number | null | undefined;
