import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc } from 'firebase/firestore';
import '../styles/ExpenseTracker.css';


function ExpenseTracker() {
  const [description, setDescription] = useState(''); 
  const [amount, setAmount] = useState();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions]=useState([]);

  //this is for adding the firestore db for transaction history
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect=(()=>{
    const fetchTransactions = async () => {
      if(user){
        const transactionCollection = collection(db, 'users', user.uid, 'transactions'); //creates a ref to firestore collection named 'transactions' under the document associated with the current user. or we can say it constructs the firestore collection path
        const transactionSnapshot = await getDocs(transactionCollection); //asynchronously retrieves all the documents (transactions) from the 'transactions' subcollection for current user
        const transactionList = transactionSnapshot.docs.map(doc => doc.data()); //maps over each document in the transactionSnapshot and extracts the data from each document
        //transactionSnapshot.docs is an array of QueryDocumentSnapshot objects, each representing a document in the collection.
        //map iterates over each QueryDocumentSnapshot and extracts the data using the data() method, which returns a plain JS object containing the document's data fields.
        //The resulting array, transactionList, contains JS objects representing each transaction.
        setTransactions(transactionList); // sets the transactions state to the array of transaction data extracted from Firestore.
        //component's state is updated with fetched data and triggers a rerender to display transactions


        //setting new balance based on fetched transactions
        const newBalance = transactionList.reduce((acc, transaction) => {
          return transaction.type==='Income' ? acc + transaction.amount : acc - transaction.amount;
        
        }, 0);
        setBalance(newBalance);
      }
    };

    fetchTransactions();
  }, [user, db]); //a dependancy array. it will re-fetch when the user changes. And by including db, we make sure that it stays synchronized with the changes that occur.

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const addTransaction = async (type) => {

    const numericAmount = parseFloat(amount);

    if(numericAmount>0){
      const newTransaction = {type, amount:numericAmount, description} //added while updating the firestore
      const newBalance = type === 'Income' ? balance + numericAmount : balance - numericAmount;

      //update the local state
      setBalance(newBalance);
      setTransactions([...transactions, newTransaction]);
      //we create a new array with spread syntax [...] to make sure that existing transactions are not lost
      //a new transaction object is created(w the parameters provided) after spreading the existing transactions. 
      //by calling setTransac. react rerenders the component to reflect changes

      setAmount(''); //reset fields
      setDescription(''); //reset fields

      //adding the transactions to firestore
      if(user){
        await addDoc(collection(db,'users', user.id, 'transactions'), newTransaction);
      }

    } else{
      alert("Invalid Value. Enter a Positive Value")
    }
  };
  
  return (
    <div className="expense-tracker-container">
      
      <h2>Expense Tracker</h2>
      <div className='inputDiv'>
      <input 
        type='text'
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter Description"
        className='input-field'
        />
        
        
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter Amount"
        className='input-field'
      />
      
      
      </div>
      <div className='buttonContainer'>
      <button onClick={ () => addTransaction('Income')} className='btn-income'>Income</button> 
      <button onClick={ () => addTransaction('Expense')} className='btn-expense'>Expense</button>
      </div>

      
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
