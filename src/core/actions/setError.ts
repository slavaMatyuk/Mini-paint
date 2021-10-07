import { ThunkAction } from 'redux-thunk';
import { AuthAction, SET_ERROR } from '../interfaces';
import { RootState } from '../reducers';

const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: msg,
    });
  };
};

export default setError;
