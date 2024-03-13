import React, {useState} from "react";
import '../styles/SignUp.css';

function SignUp({ onSignUpSuccess }){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');

    const handleUsernameChange =(e)=>{
        setUsername(e.target.value);
    };

    const handleEmailChange =(e)=>{
        setEmail(e.target.value);
    };

    const handlePasswordChange =(e)=>{
        setPassword(e.target.value);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('User Registered:', {username, email, password});
        onSignUpSuccess();
    };

    return(
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                    className="input-field"
                    required
                    />
                    <br /><br />
                <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                    className="input-field"
                    required
                    />
                    <br /><br />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Set Password"
                    className="input-field"
                    required
                    />

                    <br />
                    <button type="submit" className="btn-signup">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;