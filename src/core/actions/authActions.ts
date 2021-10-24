export const CREATE_USER_WITH_REGISTER = 'AUTH/CREATE_USER_WITH_REGISTER';
export const LOG_IN = 'AUTH/LOG_IN';
export const LOG_OUT = 'AUTH/LOG_OUT';
export const SET_AUTH = 'AUTH/SET_AUTH';
export const SET_ERROR_MESSAGE = 'AUTH/SET_ERROR_MESSAGE';

export const createUserAction = (payload: {email: string, password: string}) => (
  { type: CREATE_USER_WITH_REGISTER, payload }
);

export const logInAction = (payload: {email: string, password: string}) => (
  { type: LOG_IN, payload }
);

export const setErrorAction = (error: {code: string, message: string} | unknown) => (
  { type: SET_ERROR_MESSAGE, error }
);

export const setAuthAction = (userName: string, userID: string) => ({ type: SET_AUTH, userName, userID });

export const logOutAction = () => ({ type: LOG_OUT });
