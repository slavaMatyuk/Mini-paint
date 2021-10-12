import { takeEvery, call, put } from '@redux-saga/core/effects';
import { all } from 'redux-saga/effects';
import { setCurrentUser, setErrorMessage } from '../../actions/authActions';
import { createNewUserInDB, getAuthDataFromEmailSignUp, signOut } from '../../configs/firebase/authFirebase';
import { AuthActionTypes } from '../../interfaces';

function* workerSignUpWithEmailAndPassword({ email, password }: any) {
  try {
    const { user } = yield call(getAuthDataFromEmailSignUp, email, password);
    const currentUser = {
      uid: user.uid,
      email: user.email,
      photo: user.photoURL,
    };
    yield call(createNewUserInDB, currentUser);
    yield put(setCurrentUser(currentUser));
  } catch (error: any) {
    yield put(setErrorMessage(error.message));
  }
}

function* workerSignOut() {
  try {
    yield call(signOut);
    yield put(setCurrentUser(null));
  } catch (error: any) {
    yield put(setErrorMessage(error.message));
  }
}

function* watchSignUpWithEmailAndPassword() {
  yield takeEvery(AuthActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD, workerSignUpWithEmailAndPassword);
}

function* watchSignOut() {
  yield takeEvery(AuthActionTypes.SIGN_OUT, workerSignOut);
}

export default function* authSaga(): Generator {
  yield all([watchSignUpWithEmailAndPassword(), watchSignOut()]);
}
