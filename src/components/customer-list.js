import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerListStart } from '../redux/reducers/customer-list';
import Customer from './customer';
import AddCustomer from './add-customer';
import NewCustomerInput from './new-customer-input';
import UpdateCustomer from './update-customer';

const CustomerList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomerListStart());
  }, []);

  const [displayNewInput, changeNewInput] = useState(false);
  const [updateCustomerData, changeUpdateCustomer] = useState({});
  const { customerList, isLoading } = useSelector((state) => state.customerList);

  const onNewCustomer = useCallback(() => {
    changeNewInput((state) => !state);
  });

  const updateCustomerName = useCallback(({ id, customerName, sequence }) => {
    changeUpdateCustomer((data) => ({
      ...data,
      id, 
      customerName,
      sequence
    }));
  });

  const closeUpdation = useCallback(() => {
    changeUpdateCustomer({});
  });

  const ShowCustomerList = () => {
    return (
      !isLoading && customerList && customerList.length
        && customerList.map((customer, index) => {
          return (
            <Customer 
              key={customer.pk} 
              updateCustomerName={updateCustomerName}
              id={customer.pk}
              sequence={index + 1}
              customerName={customer.fields.csgrp_name}
              customerGroup={customer.fields.customer_group}
            />
          )    
        })
    )
  }

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
      <div className={'tip'}>
        Tip: Use Tab and 'Shift + Tab' to select option without a mouse.
      </div>
      {
        updateCustomerData.id 
        && <UpdateCustomer 
          sequence={updateCustomerData.sequence}
          id={updateCustomerData.id} 
          closeUpdation={closeUpdation}
          customerName={updateCustomerData.customerName}/>
      }
    </div>  
  )
}

export default CustomerList;
