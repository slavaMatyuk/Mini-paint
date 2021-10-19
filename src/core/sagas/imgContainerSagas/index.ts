import { takeEvery, call, put } from '@redux-saga/core/effects';
import { AnyAction } from 'redux';
import { all } from 'redux-saga/effects';
import { setErrorMessage } from '../../actions/authActions';
import { removeImage, setImages } from '../../actions/imageContainerActions';
import {
  createNewImageReferenceInDB,
  deleteImageInDatabase,
  deleteImageInStorage,
  fetchAllImages,
  loadImageToStorage,
} from '../../configs/firebase/imgFirebase';
import { ImageType, ImgActionTypes } from '../../interfaces';

function* fetchImagesWorker(): Generator {
  try {
    const imagesArray: Array<ImageType> = [];
    const querySnapshot: any = yield call(fetchAllImages);
    querySnapshot.forEach((doc: any) => imagesArray.push(doc.data()));
    yield put(setImages(imagesArray.reverse()));
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorMessage(error.message));
    }
  }
}

function* deleteImageWorker(payload: AnyAction) {
  const { imagePath, imageId } = payload;
  try {
    yield call(deleteImageInStorage, imagePath);
    yield call(deleteImageInDatabase, imageId);
    yield put(removeImage(imageId));
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorMessage(error.message));
    }
  }
}

function* uploadImageWorker(payload: AnyAction) {
  const { imagePath, imageURL } = payload;
  try {
    yield call(loadImageToStorage, imagePath, imageURL);
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorMessage(error.message));
    }
  }
}

function* createImageInstanceWorker(payload: AnyAction) {
  const {
    user, imageURL, imageId, imagePath,
  } = payload;
  try {
    yield call(createNewImageReferenceInDB, user, imageURL, imageId, imagePath);
  } catch (error) {
    if (error instanceof Error) {
      yield put(setErrorMessage(error.message));
    }
  }
}

function* fetchImagesWatcher() {
  yield takeEvery(ImgActionTypes.FETCH_IMAGES, fetchImagesWorker);
}

function* deleteImageWatcher() {
  yield takeEvery(ImgActionTypes.DELETE_IMAGE, deleteImageWorker);
}

function* uploadImageWatcher() {
  yield takeEvery(ImgActionTypes.UPLOAD_IMAGE, uploadImageWorker);
}

function* сreateImageInstanceWatcher() {
  yield takeEvery(ImgActionTypes.CREATE_IMAGE_INSTANCE_IN_DATABASE, createImageInstanceWorker);
}

export default function* imgContainerSaga(): Generator {
  yield all([fetchImagesWatcher(), deleteImageWatcher(), uploadImageWatcher(), сreateImageInstanceWatcher()]);
}
