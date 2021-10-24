import {
  takeEvery, call, all, put,
} from '@redux-saga/core/effects';
import { AnyAction } from 'redux';
import { setErrorAction } from '../../actions/authActions';
import {
  DEL_USER_IMAGE_FROM_DB,
  GET_ALL_IMAGES_FROM_DB,
  GET_USER_IMAGES_FROM_DB,
  SET_DATA_URL,
} from '../../actions/imageContainerActions';
import {
  deleteUserImage, fetchAllImages, fetchUserImages, saveImage,
} from '../../services/firebase/imgFirebase';

export function* uploadImageFetchWorker(payload: AnyAction): Generator {
  const { dataUrl, userID, userName } = payload;
  const id = Date.now().toString();
  try {
    yield call(saveImage, dataUrl, userID, userName, id);
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorAction(error.message));
    }
  }
}

export function* getImageFetchWorker(): Generator {
  try {
    yield call(fetchAllImages);
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorAction(error.message));
    }
  }
}

export function* getUserImageFetchWorker(payload: AnyAction): Generator {
  const { userID, userName } = payload;
  try {
    yield call(fetchUserImages, userID, userName);
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorAction(error.message));
    }
  }
}

export function* delImageFetchWorker(payload: AnyAction): Generator {
  const {
    id, userID, imgUrl, userName,
  } = payload;
  try {
    yield call(deleteUserImage, id, userID, imgUrl, userName);
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorAction(error.message));
    }
  }
}

export function* delImageFetchAsyncWatcher() {
  yield takeEvery(DEL_USER_IMAGE_FROM_DB, delImageFetchWorker);
}

export function* getUserImageFetchAsyncWatcher() {
  yield takeEvery(GET_USER_IMAGES_FROM_DB, getUserImageFetchWorker);
}

export function* uploadImageFetchAsyncWatcher() {
  yield takeEvery(SET_DATA_URL, uploadImageFetchWorker);
}

export function* getImageFetchAsyncWatcher() {
  yield takeEvery(GET_ALL_IMAGES_FROM_DB, getImageFetchWorker);
}

export default function* imageSaga(): Generator {
  yield all([
    call(getUserImageFetchAsyncWatcher),
    call(delImageFetchAsyncWatcher),
    call(getImageFetchAsyncWatcher),
    call(uploadImageFetchAsyncWatcher),
  ]);
}
