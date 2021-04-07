import { useSelector, useDispatch } from 'react-redux';
import { addCustomer } from '../redux/reducers/add-customer';

const NewCustomerInput = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.addCustomer);

  const handleChange = (e) => {
    dispatch(addCustomer({
      ...customer,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <tr>
      <td></td>
      <td>
      <input 
        value={customer.customerGroup}
        onChange={handleChange}
        autocomplete="off"
        className="input-field" 
        name="customerGroup" 
        type="text"/>
      </td>
      <td>
      <input 
        className="input-field" 
        value={customer.customerName}
        onChange={handleChange}
        autocomplete="off"
        name="customerName" 
        type="text"/>
      </td>
    </tr>
  )
}

export default NewCustomerInput;
