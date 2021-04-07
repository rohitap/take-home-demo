import React from 'react';

const Customer = ({ sequence, customerGroup, customerName }) => {
  return (
    <tr>
      <td>{sequence}</td>
      <td>{customerGroup}</td>
      <td>{customerName}</td>
    </tr>
  )
}

export default React.memo(Customer);
