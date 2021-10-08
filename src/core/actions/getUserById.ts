import firebase from 'firebase/compat';
import { ThunkAction } from 'redux-thunk';
import { AuthAction, SET_USER, User } from '../interfaces';
import { RootState } from '../reducers';

const getUserById = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const user = await firebase.firestore().collection('users').doc(id).get();
      if (user.exists) {
        const userData = user.data() as User;
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default getUserById;
