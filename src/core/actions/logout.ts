import firebase from 'firebase/compat';
import { ThunkAction } from 'redux-thunk';
import { AuthAction, LOG_OUT } from '../interfaces';
import { RootState } from '../services/store';
import setLoading from './setLoading';

const logout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await firebase.auth().signOut();
      dispatch({
        type: LOG_OUT,
      });
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
};

export default logout;
