import { useDispatch } from 'react-redux';
import { addCustomer } from '../redux/actions/customer';
import { resetAddCustomerState } from '../redux/reducers/add-customer';
import styles from './styles'

const AddCustomer = ({ onNewCustomer, displayNewInput }) => {
  const dispatch = useDispatch();
  const saveCustomer = () => {
    dispatch(addCustomer());
  };

  const cancel = () => {
    dispatch(resetAddCustomerState());
    onNewCustomer();
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
            className={'left'}
            style={styles.save}
            className="button">Save</button>
          <button
            onClick={cancel}
            className={'left'}
            style={styles.cancel}
            className="button">Cancel</button>
        </>
      }
    </div>
  )
}

export default AddCustomer;
