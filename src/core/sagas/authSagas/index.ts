import { takeEvery, call, put } from '@redux-saga/core/effects';
import { AnyAction } from 'redux';
import { all } from 'redux-saga/effects';
import { setCurrentUser, setErrorMessage } from '../../actions/authActions';
import {
  createNewUserInDB,
  getAuthDataFromEmailSignIn,
  getAuthDataFromEmailSignUp,
  signOut,
} from '../../services/firebase/authFirebase';
import { AuthActionTypes } from '../../interfaces';

function* signUpWithEmailAndPasswordWorker(payload: AnyAction) {
  const { email, password } = payload;
  try {
    const { user } = yield call(getAuthDataFromEmailSignUp, email, password);
    const currentUser = {
      uid: user.uid,
      email: user.email,
      photo: user.photoURL,
    };
    yield call(createNewUserInDB, currentUser);
    yield put(setCurrentUser(currentUser));
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorMessage(error.message));
    }
  }
}

function* signInWithEmailWorker(payload: AnyAction) {
  const { email, password } = payload;
  try {
    const { user } = yield call(getAuthDataFromEmailSignIn, email, password);
    const currentUser = {
      uid: user.uid,
      email: user.email,
      photo: user.photoURL,
    };
    yield put(setCurrentUser(currentUser));
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorMessage(error.message));
    }
  }
}

function* signOutWorker() {
  try {
    yield call(signOut);
    yield put(setCurrentUser(null));
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorMessage(error.message));
    }
  }
}

function* signUpWithEmailAndPasswordWatcher() {
  yield takeEvery(AuthActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD, signUpWithEmailAndPasswordWorker);
}

function* signInWithEmailWatcher() {
  yield takeEvery(AuthActionTypes.SIGN_IN_WITH_EMAIL, signInWithEmailWorker);
}

function* signOutWatcher() {
  yield takeEvery(AuthActionTypes.SIGN_OUT, signOutWorker);
}

export default function* authSaga(): Generator {
  yield all([signUpWithEmailAndPasswordWatcher(), signInWithEmailWatcher(), signOutWatcher()]);
}
