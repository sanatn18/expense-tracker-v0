import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Login.css'; 

const auth = getAuth();

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User Logged In:', email);
      onLoginSuccess();
    } catch (error) {
      console.error("Error Logging In", error.message);

      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'|| error.code === 'auth/invalid-credential') {
        setLoginError("Invalid email or password.");
      } else {
        setLoginError(error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter Email"
          className="input-field"
          required
        />

        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter Password"
          className="input-field"
          required
        />

        {loginError && <div className="error-message">{loginError}</div>}

        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
}

export default Login;
