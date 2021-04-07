import { takeLatest, put, select, delay } from 'redux-saga/effects';
import {
  fetchCustomerListStart,
  fetchCustomerListSuccess,
  fetchCustomerListAddSuccess,
  updateCustomerList
} from '../reducers/customer-list';
import {resetAddCustomerState} from '../reducers/add-customer';
import { 
  ADD_CUSTOMER, 
  UPDATE_CUSTOMER, 
  DELETE_CUSTOMER 
} from '../actions/constants';
import Customer from '../services/customer';
import { v4 as uuidv4 } from 'uuid';

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
        yield put(fetchCustomerListSuccess({ customerData: data }));
        break;
      }
      case ADD_CUSTOMER: {
        const { customer } = yield select((state) => state.addCustomer)
        if (!(customer && customer.customerGroup && customer.customerGroup.trim())) {
          alert('Customer group should not be empty!');
          return;
        }
        
        if (!(customer && customer.customerName && customer.customerName.trim())) {
          alert('Customer name should not be empty!');
          return;
        }

        yield put(fetchCustomerListAddSuccess({ 
          newCustomerData: {
            model: "accounts_receivable.cusgrp",
            pk: uuidv4(),
            fields: {
              customer_group: customer.customerGroup,
              csgrp_name: customer.customerName
            }
          }}
        ));
        yield put(resetAddCustomerState());
        break;
      }
      case UPDATE_CUSTOMER: {
        const {id, newCustomerName} = action.payload;
        if (!(newCustomerName && newCustomerName.trim())) {
          alert('Customer name should not be empty!');
          return;
        }
        let {customerList} = yield select((state) => state.customerList);
        const clonedCustomerList = JSON.parse(JSON.stringify(customerList));
        const index = clonedCustomerList.findIndex((customer) => customer.pk === id);
        clonedCustomerList[index].fields.csgrp_name = newCustomerName;
        yield put(updateCustomerList({ customerList: clonedCustomerList }));
        // Use custom delay
        yield delay(600);
        alert('Customer name has been successfully updated!');
        break;
      }
      case DELETE_CUSTOMER: {
        const {id} = action.payload;
        const {customerList} = yield select((state) => state.customerList);
        const clonedCustomerList = JSON.parse(JSON.stringify(customerList));
        const updatedCustomerList = clonedCustomerList.filter((customer) => customer.pk !== id);
        yield put(updateCustomerList({ customerList: updatedCustomerList }));
        // Use custom delay
        yield delay(600);
        alert('Customer has been successfully deleted!');
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
