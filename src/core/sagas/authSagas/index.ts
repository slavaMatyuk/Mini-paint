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
import { DBcreateUserResponce } from '../../interfaces';
import {
  createNewUserInDB, getAuthDataFromEmailSignIn, getAuthDataFromEmailSignUp, signOut,
} from '../../services/firebase/authFirebase';

export function* createUserWithEmailFetchWorker(data: AnyAction) {
  const { payload } = data;
  try {
    const response: DBcreateUserResponce = yield call(getAuthDataFromEmailSignUp, payload);
    const currentUser = {
      userID: response.userID,
      userName: response.userName,
      images: response.images,
    };
    yield put(createUserSucceededAction(response));
    yield call(createNewUserInDB, currentUser);
  } catch (error) {
    yield put(createUserFailedAction(error));
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
    yield put(logInFailedAction(error));
  }
}

export function* signOutFetchAsyncWorker() {
  try {
    yield call(signOut);
    yield put(logOutSucceededAction());
  } catch (error) {
    yield put(logOutFailedAction(error));
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
