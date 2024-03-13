import React, { useState } from 'react';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import SignUp from './components/SignUp';

function App() {

  const [isAuthenticated, setIsAuthenticated]=useState(false);
  
  const handleSignUpSuccess = ()=>{
    setIsAuthenticated(true);
  }

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <SignUp onSignUpSuccess={handleSignUpSuccess}/>
      ) : (
        <ExpenseTracker/>
      
      )}
    </div>
  );
}

export default App;