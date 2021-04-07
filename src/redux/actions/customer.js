import { createAction } from 'redux-actions'
import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
} from './constants'

export const addCustomer = createAction(ADD_CUSTOMER);
export const updateCustomer = createAction(UPDATE_CUSTOMER);
export const deleteCustomer = createAction(DELETE_CUSTOMER);

