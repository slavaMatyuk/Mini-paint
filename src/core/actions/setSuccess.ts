import { ThunkAction } from 'redux-thunk';
import { AuthAction, SET_SUCCESS } from '../interfaces';
import { RootState } from '../reducers';

const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg,
    });
  };
};

export default setSuccess;
