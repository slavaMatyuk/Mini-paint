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
    yield put(saveImageFailedAction(error as { code: string, message: string }));
  }
}

export function* getAllImagesFetchWorker(): Generator {
  try {
    const data = yield call(fetchAllImages);
    yield put(getAllImagesFromDbSucceededAction(data as { id: string, imgUrl: string, userName: string }));
  } catch (error) {
    yield put(getAllImagesFromDbFailedAction(error as { code: string, message: string }));
  }
}

export function* getUserImageFetchWorker(payload: AnyAction): Generator {
  const { userID, userName } = payload;
  try {
    const data = yield call(fetchUserImages, userID, userName);
    yield put(getUserImagesFromDbSucceededAction(data as { id: string, imgUrl: string, userName: string }));
  } catch (error) {
    yield put(getUserImagesFromDbFailedAction(error as { code: string, message: string }));
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
    yield put(delUserImageFromDbFailedAction(error as { code: string, message: string }));
  }
}

export function* delImageFetchAsyncWatcher(): Generator {
  yield takeEvery(DEL_USER_IMAGE_FROM_DB, delImageFetchWorker);
}

export function* getUserImageFetchAsyncWatcher(): Generator {
  yield takeEvery(GET_USER_IMAGES_FROM_DB, getUserImageFetchWorker);
}

export function* saveImageFetchAsyncWatcher(): Generator {
  yield takeEvery(SET_DATA_URL, saveImageFetchWorker);
}

export function* getAllImagesFetchAsyncWatcher(): Generator {
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
