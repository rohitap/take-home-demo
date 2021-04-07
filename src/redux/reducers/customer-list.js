import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  customerList: []
}

const {
  actions: {
    fetchCustomerListStart,
    fetchCustomerListSuccess,
    fetchCustomerListFailure,
    fetchCustomerListAddSuccess,
    updateCustomerList
  },
  reducer,
} = createSlice({
  name: 'customerList',
  initialState,
  reducers: {
    fetchCustomerListStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    fetchCustomerListSuccess: (state, action) => ({
      ...initialState,
      customerList: action && action.payload && action.payload.customerData,
      isLoading: false,
    }),
    fetchCustomerListFailure: () => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
    fetchCustomerListAddSuccess: (state, action) => ({
      ...initialState,
      customerList: [...state.customerList, action.payload.newCustomerData]
    }),
    updateCustomerList: (state, action) => {
      return {
        ...initialState,
        customerList: action.payload.customerList
      }
    }
  },
})

export default reducer
export {
  fetchCustomerListStart,
  fetchCustomerListSuccess,
  fetchCustomerListFailure,
  fetchCustomerListAddSuccess,
  updateCustomerList
}
