import {
  CREATE_USER_WITH_REGISTER,
  LOG_IN,
  SET_ERROR_MESSAGE,
  SET_AUTH,
  LOG_OUT_SUCCEEDED,
  LOG_OUT_FAILED,
  LOG_IN_SUCCEEDED,
  LOG_IN_FAILED,
  CREATE_USER_WITH_REGISTER_SUCCEEDED,
  CREATE_USER_WITH_REGISTER_FAILED,
} from '../actions/authActions';

interface Action {
  type: string,
  payload: {
    userName: string,
    userID: string
  },
  error: {
    code:string,
    message: string
  },
  userName: string,
  userID: string
}

export interface AuthState {
  loading: boolean,
  error: boolean,
  authenticated: boolean,
  errorMessage: string | null,
  userName: string,
  userID: string,
}

const initialState: AuthState = {
  loading: false,
  error: false,
  authenticated: false,
  errorMessage: null,
  userName: '',
  userID: '',
};

export const authReducer = (state = initialState, action: Action): object => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state, authenticated: true, userName: action.userName, userID: action.userID,
      };
    case CREATE_USER_WITH_REGISTER:
      return { ...state, loading: true, error: false };
    case CREATE_USER_WITH_REGISTER_SUCCEEDED:
      return {
        ...state, loading: false, error: false, authenticated: true,
      };
    case CREATE_USER_WITH_REGISTER_FAILED:
      return {
        ...state, loading: false, error: true, errorMessage: action.error.message,
      };
    case LOG_IN:
      return { ...state, loading: true, error: false };
    case LOG_IN_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: false,
        authenticated: true,
        userName: action.payload.userName,
        userID: action.payload.userID,
      };
    case LOG_IN_FAILED:
      return {
        ...state, loading: false, error: true, errorMessage: action.error.message,
      };
    case LOG_OUT_SUCCEEDED:
      return { ...state, authenticated: false };
    case LOG_OUT_FAILED:
      return { ...state, error: action.error };
    case SET_ERROR_MESSAGE:
      return { ...state, error: true, errorMessage: action.error };
    default:
      return state;
  }
};

export default authReducer;
