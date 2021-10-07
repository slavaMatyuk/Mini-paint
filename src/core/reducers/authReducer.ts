import { AuthState, AuthAction, SET_USER, SET_LOADING, LOG_OUT, SET_ERROR, SET_SUCCESS } from '../interfaces/index';

const initialState: AuthState = {
  user: null,
  authenticated: false,
  loading: false,
  error: '',
  success: '',
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        loading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
