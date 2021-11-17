import { all } from 'redux-saga/effects';
import authSaga from './authSagas';
import imageSaga from './imageSagas';

export default function* rootSaga(): Generator {
  yield all([authSaga(), imageSaga()]);
}
