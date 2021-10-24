import {
  all, call, put, takeEvery,
} from '@redux-saga/core/effects';
import { AnyAction } from 'redux';
import {
  CREATE_USER_WITH_REGISTER,
  setErrorAction,
  LOG_IN,
  LOG_OUT,
} from '../../actions/authActions';
import { getAuthDataFromEmailSignIn, getAuthDataFromEmailSignUp, signOut } from '../../services/firebase/authFirebase';

export interface FirebaseCreateUserResponse {
    userID: string,
    userName: string,
    images: string[]
}

export function* createUserWithEmailFetchWorker(data: AnyAction) {
  const { payload } = data;
  try {
    yield call(getAuthDataFromEmailSignUp, payload);
    // const response: FirebaseCreateUserResponse = yield call(getAuthDataFromEmailSignUp, payload);
    // const currentUser = {
    //   userID: response.userID,
    //   userName: response.userName,
    //   images: response.images,
    // };
    // yield call(createNewUserInDB, currentUser);
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorAction(error.message));
    }
  }
}

export function* signInWithEmailFetchWorker(data: AnyAction) {
  const { payload } = data;
  const userData: { userName: string, userID: string} = {
    userName: '',
    userID: '',
  };
  try {
    yield getAuthDataFromEmailSignIn(payload).then((loginData) => {
      if (loginData.user && loginData.user?.email) {
        userData.userID = loginData.user?.uid;
        userData.userName = loginData.user?.email;
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorAction(error.message));
    }
  }
}

export function* signOutFetchAsyncWorker() {
  try {
    yield call(signOut);
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorAction(error.message));
    }
  }
}

export function* signOutFetchAsyncWatcher() {
  yield takeEvery(LOG_OUT, signOutFetchAsyncWorker);
}

export function* createUserWithEmailFetchAsyncWatcher() {
  yield takeEvery(CREATE_USER_WITH_REGISTER, createUserWithEmailFetchWorker);
}

export function* signInWithEmailFetchAsyncWatcher() {
  yield takeEvery(LOG_IN, signInWithEmailFetchWorker);
}

export default function* authSaga(): Generator {
  yield all([
    call(signOutFetchAsyncWatcher),
    call(createUserWithEmailFetchAsyncWatcher),
    call(signInWithEmailFetchAsyncWatcher),
  ]);
}
