import { combineReducers } from '@reduxjs/toolkit'
import CustomerListReducer from './customer-list';
import AddCustomerReducer from './add-customer';

const rootReducer = combineReducers({
  customerList: CustomerListReducer,
  addCustomer: AddCustomerReducer
});

export default rootReducer;
