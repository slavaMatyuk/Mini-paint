export const CREATE_USER_WITH_REGISTER = 'AUTH/CREATE_USER_WITH_REGISTER';
export const CREATE_USER_WITH_REGISTER_SUCCEEDED = 'AUTH/CREATE_USER_WITH_REGISTER_SUCCEEDED';
export const CREATE_USER_WITH_REGISTER_FAILED = 'AUTH/CREATE_USER_WITH_REGISTER_FAILED';
export const LOG_IN = 'AUTH/LOG_IN';
export const LOG_IN_SUCCEEDED = 'AUTH/LOG_IN_SUCCEEDED';
export const LOG_IN_FAILED = 'AUTH/LOG_IN_FAILED';
export const LOG_OUT = 'AUTH/LOG_OUT';
export const LOG_OUT_SUCCEEDED = 'AUTH/LOG_OUT_SUCCEEDED';
export const LOG_OUT_FAILED = 'AUTH/LOG_OUT_FAILED';
export const SET_AUTH = 'AUTH/SET_AUTH';
export const VERIFY_AUTH = 'AUTH/VERIFY_AUTH';
export const SET_ERROR_MESSAGE = 'AUTH/SET_ERROR_MESSAGE';

export const createUserAction = (payload: {email: string, password: string}) => (
  { type: CREATE_USER_WITH_REGISTER, payload }
);

export const logInAction = (payload: {email: string, password: string}) => (
  { type: LOG_IN, payload }
);

export const setErrorAction = (error: {code: string, message: string}) => (
  { type: SET_ERROR_MESSAGE, error }
);

export const setAuthAction = (userName: string, userID: string) => ({ type: SET_AUTH, userName, userID });

export const logOutAction = () => ({ type: LOG_OUT });

export const createUserSucceededAction = (payload: { userName: string, userID: string}) => (
  { type: CREATE_USER_WITH_REGISTER_SUCCEEDED, payload }
);

export const createUserFailedAction = (error: {code: string, message: string}) => (
  { type: CREATE_USER_WITH_REGISTER_FAILED, error }
);

export const logInSucceededAction = (payload: { userName: string, userID: string}) => (
  { type: LOG_IN_SUCCEEDED, payload }
);

export const logInFailedAction = (error: {code: string, message: string}) => (
  { type: LOG_IN_FAILED, error }
);

export const logOutSucceededAction = () => ({ type: LOG_OUT_SUCCEEDED });

export const logOutFailedAction = (error: {code: string, message: string}) => (
  { type: LOG_OUT_FAILED, error }
);

export const verifyAuthAction = () => ({ type: VERIFY_AUTH });
