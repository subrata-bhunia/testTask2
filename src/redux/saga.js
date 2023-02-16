import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {getAll} from './api';
import {productsFailure, productsSuccess} from './reducers';

export function* productSaga(action) {
  try {
    const products = yield call(getAll);
    yield put(productsSuccess(products));
  } catch (error) {
    console.log('ddd', error);
    yield put(productsFailure(error));
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Root/productsRequest', productSaga);
  })(),
];

const combinedSaga = [...watchFunction];

export default function* RootSaga() {
  yield all(combinedSaga);
}
