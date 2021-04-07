import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCustomer, deleteCustomer } from '../redux/actions/customer';
import styles from './styles';

const UpdateCustomer = ({ id, customerName, closeUpdation }) => {
  const [newCustomerName, changeCustomerName] = useState(customerName);
  const dispatch = useDispatch();

  useEffect(() => {
    changeCustomerName(customerName);
  }, [customerName]);

  const updateCustomerDetail = () => {
    dispatch(updateCustomer({ id, newCustomerName, closeUpdation }));
    closeUpdation();
  }

  const deleteCustomerDetail = () => {
    dispatch(deleteCustomer({ id })); 
    closeUpdation();   
  }

  const handleChange = (e) => {
    changeCustomerName(() => e.target.value);
  }

  return (
    <div className='update-customer-container'>
      <h1>Name</h1>
      <input 
        value={newCustomerName} 
        onChange={handleChange} 
        className="input" 
        type="text" 
        autoComplete="off"/>
      <div>
        <button
          style={{width: styles.width, backgroundColor: styles.success }}
          className={"button left"} onClick={() => updateCustomerDetail()}>Save</button>
        <button
          style={{width: styles.width, backgroundColor: styles.warn.backgroundColor }}
          className={"button left"} onClick={() => deleteCustomerDetail()}>Delete</button>
        <button
          style={{width: styles.width, backgroundColor: styles.warn.backgroundColor }}
          className={"button left"} onClick={closeUpdation}>Close</button>  
      </div>  
    </div>
  )
}

export default UpdateCustomer;
