import { ThunkAction } from 'redux-thunk';
import { AuthAction, SET_LOADING } from '../interfaces';
import { RootState } from '../reducers';

const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    });
  };
};

export default setLoading;
