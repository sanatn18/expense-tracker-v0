import React, { useState } from 'react';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {

  const [isAuthenticated, setIsAuthenticated]=useState(false);
  const [showLogin, setShowLogin]=useState(false); //to toggle between login and signup

  const handleAuthSuccess = ()=>{
    setIsAuthenticated(true);
  }

  const toggleShowLogin = ()=>{
    setShowLogin(!showLogin);
  }

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <>
          {showLogin ? (
            <>
              <Login onLoginSuccess={handleAuthSuccess}/>
              <p className='toggle-auth'>
                Don't have an account? <button className="signup-btn" onClick={toggleShowLogin}>Sign Up</button>
              </p>
              </>
          ) : (
            <>
            <SignUp/>
            <p className='toggle-auth'>
              Already have an account? <button className="login-btn" onClick={toggleShowLogin}>Login</button>
            </p>
            </>
          )}
          </>
      ): (
        <ExpenseTracker/>
      )}
    </div>
  );
}

export default App;