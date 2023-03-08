import React from "react";

function ExpenseList(props) {
  return (
        
          <tr>
            <td>{props.expenseId}</td>
            <td>{props.expenseName}</td>
            <td>{props.expenseCount}</td>
            <td>{props.expenseQuantity}</td>
            <td>{props.amount}</td>
            <td>{props.paymentType}</td>
            <td>{props.expenseDate}</td>
            <td>{props.expenseTime}</td>
            <td>{props.totalAmount}</td>
          </tr>
        
  );
}
export default ExpenseList;
