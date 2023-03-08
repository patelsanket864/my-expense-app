import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import ExpenseList from "./ExpenseList";
import styles from "../styles/list.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function ExpenseForm() {
  const [expenseList, setExpenseList] = useState([]);
  const [total, setTotal] = useState();

  const [inputField, setInputField] = useState({
    expenseName: "",
    paymentType: "",
    amount: "",
    expenseCount: "",
    expenseQuantity: "",
    totalPrice:"",
    expenseDate: format(new Date(), "dd-MM-yyyy"),
    expenseTime: format(new Date(), "hh:mm:ss"),
  });

  const [dateValue, setDateValue] = useState(new Date());

  const handleInput = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handledate = (d) => {
    const eDate =
      d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    const eTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    setInputField({
      expenseDate: eDate,
      expenseTime: eTime,
    });
  };
  const handleForm = (e) => {
    e.preventDefault();
    console.log("Expense:", inputField);
    fetch("http://localhost:8081/addExpense", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputField),
    }).then(
      function (res) {
        if (res.ok) {
          document.getElementById('alrt').innerHTML='<b>Expense Added Succesfully</b>'; 
          setTimeout(function() {document.getElementById('alrt').innerHTML='';},2000);
        } else if (res.status === 401) {
          document.getElementById('alrt').innerHTML='<b>Ooops!! Did not get Res.</b>'; 
          setTimeout(function() {document.getElementById('alrt').innerHTML='';},2000);
        }
      },
      function (e) {
        document.getElementById('alrt').innerHTML='<b>Error submitting form!</b>'; 
          setTimeout(function() {document.getElementById('alrt').innerHTML='';},2000);
      }
    );
  };

  const deleteExpense = async () => {
    await axios("http://localhost:8081/deleteAllExpense", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(function (res) {
      if (res.ok) {
        alert("deleted Successfully");
      } else if (res.status === 401) {
        alert("Oops! ");
      }
    });
  };

  const calcualteTotal = async () => {
    const response = await axios("http://localhost:8081/calculateExpense", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setTotal(response.data);
    console.log("total sum: ", setTotal);
  };

  const getExpense = async () => {
    const response = await axios("http://localhost:8081/getAll", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setExpenseList(response.data);
    console.log("its printed", expenseList);
  };
  return (
    <div className="container">
      <div className="formstyle">
        <form onSubmit={handleForm} name="expenseForm">
          <div style={{ margin: "20px 50px 0px 0px" }}>
            <DateTimePicker value={dateValue} onChange={handledate} />
          </div>
          <div className="fields">
            <TextField
              style={{ width: "80%" }}
              label="Expense Name"
              id="standard-basic"
              variant="standard"
              type="text"
              name="expenseName"
              onChange={handleInput}
              value={inputField.expenseName}
              color="success"
              required
            />
          </div>
          <div className="fields">
            <TextField
              style={{ width: "80%" }}
              label="Expense Count"
              id="standard-basic"
              variant="standard"
              type="number"
              name="expenseCount"
              onChange={handleInput}
              value={inputField.expenseCount}
              color="success"
              required
            />
          </div>
          <div className="fields">
            <TextField
              style={{ width: "80%" }}
              label="Expense Quantity in Grams"
              id="standard-basic"
              variant="standard"
              type="number"
              name="expenseQuantity"
              onChange={handleInput}
              value={inputField.expenseQuantity}
              color="success"
              required
            />
          </div>
          <div className="fields">
            <TextField
              style={{ width: "80%" }}
              id="standard-basic"
              variant="standard"
              label="Enter Amount"
              type="number"
              name="amount"
              value={inputField.amount}
              onChange={handleInput}
            />
          </div>
          <p style={{ width: "70%" }}>
            Cash
            <Radio
              checked={inputField.paymentType === "cash"}
              name="paymentType"
              id="cash"
              value="cash"
              onChange={handleInput}
            />
            <span>Online</span>
            <Radio
              checked={inputField.paymentType === "online"}
              name="paymentType"
              id="online"
              value="online"
              onChange={handleInput}
            />
          </p>
          <Button
            style={{ margin: "0px 10px " }}
            variant="outlined"
            type="Submit"
            value="ADD"
          >
            ADD
          </Button>
          <Button
            color="success"
            style={{ margin: "0px 10px " }}
            variant="contained"
            onClick={getExpense}
          >
            {" "}
            SHOW
          </Button>
          <Button
            color="error"
            style={{ margin: "0px 10px " }}
            variant="contained"
            onClick={deleteExpense}
          >
            DELETE
          </Button>
        </form>
        <p style={{ padding: "10px 115px 0px 0px" }}>
          <Button variant="outlined" onClick={calcualteTotal}>
            Total Expense : {total}
          </Button>
        </p>
        <p id='alrt' style={{color:'green',margin:'20px 70px 0px 0px' }}></p>
      </div>

      <div className="tablestyle">
        <table className={styles.table}>
          <tr className={styles.header}>
            <th scope="col">ID</th>
            <th style={{ width: "35%" }} scope="col">
              NAME
            </th>
            <th scope="col">COUNT</th>
            <th scope="col">QUANTITY(gms)</th>
            <th scope="col">AMOUNT</th>
            <th scope="col">CASH / ONLINE</th>
            <th scope="col">PURCHASE DATE</th>
            <th scope="col">TIME</th>
            <th scope="col">TOTAL AMOUNT</th>
          </tr>
          {expenseList.map((item, i) => {
            return (
              <ExpenseList
                expenseId={item.expenseId}
                expenseName={item.expenseName}
                expenseCount={item.expenseCount}
                expenseQuantity={item.expenseQuantity}
                amount={item.amount}
                paymentType={item.paymentType}
                expenseDate={item.expenseDate}
                expenseTime={item.expenseTime}
                totalAmount={item.totalAmount}
              />
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default ExpenseForm;
