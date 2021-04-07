import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  customer: {
    customerName: '',
    customerGroup: ''
  }
}

const {
  actions: {
    addCustomer,
    resetAddCustomerState
  },
  reducer,
} = createSlice({
  name: 'addCustomer',
  initialState,
  reducers: {
    addCustomer: (state, action ) => ({
      ...initialState,
      isLoading: true,
      customer: action.payload   
    }),
    resetAddCustomerState: (state, action) => ({
      ...initialState
    }),
  },
})

export default reducer
export {
  addCustomer,
  resetAddCustomerState
}
