import {
  all, call, put, takeEvery,
} from '@redux-saga/core/effects';
import { AnyAction } from 'redux';
import {
  DEL_USER_IMAGE_FROM_DB, getUserImagesFromDbFailedAction, getUserImagesFromDbSucceededAction, GET_ALL_IMAGES_FROM_DB,
  GET_USER_IMAGES_FROM_DB, SET_DATA_URL, delUserImageFromDbFailedAction, delUserImageFromDbSucceededAction,
  getAllImagesFromDbFailedAction, getAllImagesFromDbSucceededAction, saveImageFailedAction, saveImageSucceededAction,
} from '../../actions/imageContainerActions';
import {
  deleteUserImage, fetchAllImages, fetchUserImages, saveImage,
} from '../../services/firebase/imgFirebase';

export function* saveImageFetchWorker(payload: AnyAction): Generator {
  const { dataUrl, userID, userName } = payload;
  const id = Date.now().toString();
  try {
    yield call(saveImage, dataUrl, userID, userName, id);
    yield put(saveImageSucceededAction());
  } catch (error) {
    yield put(saveImageFailedAction(error));
  }
}

export function* getAllImagesFetchWorker(): Generator {
  try {
    const data: any = yield call(fetchAllImages);
    yield put(getAllImagesFromDbSucceededAction(data));
  } catch (error) {
    yield put(getAllImagesFromDbFailedAction(error));
  }
}

export function* getUserImageFetchWorker(payload: AnyAction): Generator {
  const { userID, userName } = payload;
  try {
    const data: [object] | unknown = yield call(fetchUserImages, userID, userName);
    yield put(getUserImagesFromDbSucceededAction(data));
  } catch (error) {
    yield put(getUserImagesFromDbFailedAction(error));
  }
}

export function* delImageFetchWorker(payload: AnyAction): Generator {
  const {
    id, userID, imgUrl, userName,
  } = payload;
  try {
    yield call(deleteUserImage, id, userID, imgUrl, userName);
    yield put(delUserImageFromDbSucceededAction());
  } catch (error) {
    yield put(delUserImageFromDbFailedAction(error));
  }
}

export function* delImageFetchAsyncWatcher() {
  yield takeEvery(DEL_USER_IMAGE_FROM_DB, delImageFetchWorker);
}

export function* getUserImageFetchAsyncWatcher() {
  yield takeEvery(GET_USER_IMAGES_FROM_DB, getUserImageFetchWorker);
}

export function* saveImageFetchAsyncWatcher() {
  yield takeEvery(SET_DATA_URL, saveImageFetchWorker);
}

export function* getAllImagesFetchAsyncWatcher() {
  yield takeEvery(GET_ALL_IMAGES_FROM_DB, getAllImagesFetchWorker);
}

export default function* imageSaga(): Generator {
  yield all([
    call(getUserImageFetchAsyncWatcher),
    call(delImageFetchAsyncWatcher),
    call(getAllImagesFetchAsyncWatcher),
    call(saveImageFetchAsyncWatcher),
  ]);
}
