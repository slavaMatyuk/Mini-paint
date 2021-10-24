import {
  CREATE_USER_WITH_REGISTER,
  LOG_IN,
  SET_ERROR_MESSAGE,
  SET_AUTH,
  LOG_OUT,
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
  error: boolean,
  authenticated: boolean,
  errorMessage: string | null,
  userName: string,
  userID: string,
}

const initialState: AuthState = {
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
      return {
        ...state, error: false, authenticated: true,
      };
    case LOG_IN:
      return {
        ...state,
        error: false,
        authenticated: true,
        userName: action.payload.userName,
        userID: action.payload.userID,
      };
    case LOG_OUT:
      return { ...state, authenticated: false };
    case SET_ERROR_MESSAGE:
      return { ...state, error: true, errorMessage: action.error };
    default:
      return state;
  }
};

export default authReducer;
