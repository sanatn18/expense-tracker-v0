import React, { useState } from 'react';
import '../styles/ExpenseTracker.css';

function ExpenseTracker() {
  const [description, setDescription] = useState(''); 
  const [amount, setAmount] = useState();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions]=useState([]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const addTransaction = (type) => {
    const numericAmount = parseFloat(amount);
    if(numericAmount>0){
      const newBalance = type === 'Income' ? balance + numericAmount : balance - numericAmount;
      setBalance(newBalance);
      setTransactions([...transactions, {type, amount:numericAmount, description}]);
      setAmount(''); //reset fields
      setDescription(''); //reset fields
    } else{
      alert("Invalid Value. Enter a Positive Value")
    }
  };
  
  return (
    <div className="expense-tracker-container">
      <h2>Expense Tracker</h2>
      <input 
        type='text'
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter Description"
        className='input-field'
        />
        <br/><br/>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter Amount"
        className='input-field'
      />
      <br/>
    
      <button onClick={ () => addTransaction('Income')} className='btn-income'>Income</button> 
      <button onClick={ () => addTransaction('Expense')} className='btn-expense'>Expense</button>
     
      <h3>Balance: ₹{balance}</h3>
      <h4>Transaction History: </h4>
      <table className='transaction-table'>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        {transactions.map((transaction, index)=> (
          <tr key={index} style={{ listStyleType: 'none' }} className={transaction.type==='Income'? 'transaction-income': 'transaction-expense'}> 
              <td>{transaction.type}</td>
              <td>₹{transaction.amount}</td>
              <td>{transaction.description}</td>
          </tr>
          
        ))}
      </tbody>
      </table>
    </div>
  );
}

export default ExpenseTracker;
