import { takeEvery, call, put } from '@redux-saga/core/effects';
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
import { ImgActionTypes } from '../../interfaces';

function* workerFetchImages(): any {
  try {
    const imagesArray: any = [];
    const querySnapshot = yield call(fetchAllImages);
    querySnapshot.forEach((doc: any) => imagesArray.push(doc.data()));
    yield put(setImages(imagesArray.reverse()));
  } catch (error: any) {
    yield put(setErrorMessage(error.message));
  }
}

function* workerDeleteImage({ imagePath, imageId }: any) {
  try {
    yield call(deleteImageInStorage, imagePath);
    yield call(deleteImageInDatabase, imageId);
    yield put(removeImage(imageId));
  } catch (error: any) {
    yield put(setErrorMessage(error.message));
  }
}

function* workerUploadImage({ imagePath, imageURL }: any) {
  try {
    yield call(loadImageToStorage, imagePath, imageURL);
  } catch (error: any) {
    yield put(setErrorMessage(error.message));
  }
}

function* workerCreateImageInstance({ user, imageURL, imageId, imagePath }: any) {
  try {
    yield call(createNewImageReferenceInDB, user, imageURL, imageId, imagePath);
  } catch (error: any) {
    yield put(setErrorMessage(error.message));
  }
}

function* watchFetchImages() {
  yield takeEvery(ImgActionTypes.FETCH_IMAGES, workerFetchImages);
}

function* watchDeleteImage() {
  yield takeEvery(ImgActionTypes.DELETE_IMAGE, workerDeleteImage);
}

function* watchUploadImage() {
  yield takeEvery(ImgActionTypes.UPLOAD_IMAGE, workerUploadImage);
}

function* watchCreateImageInstance() {
  yield takeEvery(ImgActionTypes.CREATE_IMAGE_INSTANCE_IN_DATABASE, workerCreateImageInstance);
}

export default function* imgContainerSaga(): Generator {
  yield all([watchFetchImages(), watchDeleteImage(), watchUploadImage(), watchCreateImageInstance()]);
}
