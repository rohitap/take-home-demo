import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerListStart } from '../redux/reducers/customer-list';
import Customer from './customer';
import AddCustomer from './add-customer';
import NewCustomerInput from './new-customer-input';

const CustomerList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomerListStart());
  }, []);

  const [displayNewInput, changeNewInput] = useState(false);
  const { customerList, isLoading } = useSelector((state) => state.customerList);

  const ShowCustomerList = () => {
    return (
      !isLoading && customerList && customerList.length
        && customerList.map((customer, index) => {
          return (
            <Customer 
              key={customer.pk} 
              sequence={index + 1}
              customerName={customer.fields.csgrp_name}
              customerGroup={customer.fields.customer_group}
            />
          )    
        })
    )
  }

  const onNewCustomer = useCallback(() => {
    changeNewInput(true);
  })

  return (
    <div className="customer-list">
      <table className="customer-table">
        <tbody>
          <tr>
            <th>Sequence</th>
            <th>Customer Group</th>
            <th>Customer Name</th>
          </tr>
          <ShowCustomerList/>
          {displayNewInput && <NewCustomerInput />}
        </tbody>  
      </table>
      {
        <AddCustomer 
          onNewCustomer={onNewCustomer} 
          displayNewInput={displayNewInput}/>
      }
    </div>  
  )
}

export default CustomerList;
