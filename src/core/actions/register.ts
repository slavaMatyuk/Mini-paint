import firebase from 'firebase/compat';
import { ThunkAction } from 'redux-thunk';
import { AuthAction, SET_ERROR, SET_USER, RegisterData, User } from '../interfaces';
import { RootState } from '../services/store';

const register = (data: RegisterData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
      if (res.user) {
        const userData: User = {
          email: data.email,
          firstName: data.firstName,
          id: res.user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await firebase.firestore().collection('/users').doc(res.user.uid).set(userData);
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (err: any) {
      console.log(err);
      onError();
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};

export default register;
