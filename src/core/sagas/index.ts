import { all } from 'redux-saga/effects';
import authSaga from './authSagas';
import imgContainerSaga from './imgContainerSagas';

export default function* rootSaga(): Generator {
  yield all([authSaga(), imgContainerSaga()]);
}
