import firebase from 'firebase/compat';
import { ThunkAction } from 'redux-thunk';
import { AuthAction, LogInData } from '../interfaces';
import { RootState } from '../services/store';
import setError from './setError';

const login = (data: LogInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    } catch (err: any) {
      console.log(err);
      onError();
      dispatch(setError(err.message));
    }
  };
};

export default login;
