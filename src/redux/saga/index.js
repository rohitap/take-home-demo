import { all } from 'redux-saga/effects';
import customerList from './customer-list';

export default function* rootSaga() {
  yield all([
    customerList()
  ]);  
}
