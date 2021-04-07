import { takeLatest, put } from 'redux-saga/effects';
import {
  fetchCustomerListStart,
  fetchCustomerListSuccess,
  fetchCustomerListFailure
} from '../reducers/customer-list';
import { 
  ADD_CUSTOMER, 
  UPDATE_CUSTOMER, 
  DELETE_CUSTOMER 
} from '../actions/constants';
import Customer from '../services/customer';

function* customerListWatcher() {
  yield takeLatest([ 
    fetchCustomerListStart.type, 
    ADD_CUSTOMER, 
    UPDATE_CUSTOMER, 
    DELETE_CUSTOMER ], CustomerListWorker)
}

function* CustomerListWorker(action) {
  try {
    switch (action.type) {
      case fetchCustomerListStart.type: {
        const data = Customer.getCustomerList();
        yield(put(fetchCustomerListSuccess({ customerData: data })));
        console.log('Fetching customer list...', data);
        break;
      }
      case ADD_CUSTOMER: {
        console.log('Add customer...');
        // TODO: Call fetchCustomerListSuccess action
        break;
      }
      case UPDATE_CUSTOMER: {
        console.log('Update customer...');
        // TODO: Call fetchCustomerListSuccess action
        break;
      }
      case DELETE_CUSTOMER: {
        console.log('Update customer...');
        // TODO: Call fetchCustomerListSuccess action
        break;
      }
      default:
        break
    }
  } catch (e) {
    console.error(`Error occuring while calling an action ${action.type}`, e);
  }
}

export default customerListWatcher
