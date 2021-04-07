import { useDispatch } from 'react-redux';
import { addCustomer } from '../redux/actions/customer';
import { resetAddCustomerState } from '../redux/reducers/add-customer';

const AddCustomer = ({ onNewCustomer, displayNewInput }) => {
  const dispatch = useDispatch();
  const saveCustomer = () => {
    dispatch(addCustomer())
  };

  const cancel = () => {
    dispatch(resetAddCustomerState())
  };

  return (
    <div className="add-button-container">
      {
        !displayNewInput && 
        <button className="button" onClick={onNewCustomer}>Add New</button>
      }  
      {
        displayNewInput 
        && 
        <>
          <button 
            onClick={saveCustomer}
            style={{width: '47%', float: 'left', backgroundColor: 'green' }} 
            className="button">Save</button>
          <button 
            onClick={cancel}
            style={{width: '48%', float: 'left', backgroundColor: 'red' }} 
            className="button">Cancel</button>
        </>
      }
    </div>
  )
}

export default AddCustomer;
