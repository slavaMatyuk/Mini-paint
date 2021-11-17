import {
  all, call, put, takeEvery,
} from '@redux-saga/core/effects';
import { AnyAction } from 'redux';
import {
  createUserFailedAction,
  createUserSucceededAction,
  CREATE_USER_WITH_REGISTER, logInFailedAction, logInSucceededAction, logOutFailedAction, logOutSucceededAction, LOG_IN,
  LOG_OUT,
} from '../../actions/authActions';
import { DBcreateUserResponse } from '../../interfaces';
import { getAuthDataFromEmailSignIn, getAuthDataFromEmailSignUp, signOut } from '../../services/firebase/authFirebase';

export function* createUserWithEmailFetchWorker(data: AnyAction) {
  const { payload } = data;
  try {
    const response: DBcreateUserResponse = yield call(getAuthDataFromEmailSignUp, payload);
    yield put(createUserSucceededAction(response));
  } catch (error) {
    yield put(createUserFailedAction(error as { code: string, message: string }));
  }
}

export function* signInWithEmailFetchWorker(data: AnyAction) {
  const { payload } = data;
  const userData: { userName: string, userID: string } = {
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
    yield put(logInSucceededAction(userData));
  } catch (error) {
    yield put(logInFailedAction(error as { code: string, message: string }));
  }
}

export function* signOutFetchAsyncWorker() {
  try {
    yield call(signOut);
    yield put(logOutSucceededAction());
  } catch (error) {
    yield put(logOutFailedAction(error as { code: string, message: string }));
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
