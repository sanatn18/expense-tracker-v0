import React, {useState} from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import '../styles/SignUp.css';
import '../firebaseConfig';
import db from "../firebaseConfig";

const auth = getAuth();
// const db = getFirestore();


function SignUp({ onSignUpSuccess }){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conpassword, setConPassword]= useState('');
    const [passwordError, setPasswordError] = useState('');

    const validatePassword=(password)=>{
        const minLength = 4;
        const hasNumber = /\d/;
        const hasSpecialChar=/[!@#$%^&*(),.?":{}|<>]/
        if(password.length < minLength){
            return "Password must have at least 4 characters."
        } else if(!hasNumber.test(password)){
            return "Password must have at least 1 number."
        } else if(!hasSpecialChar.test(password)){
            return "Password must have at least 1 special character"
        }
        return "";
    };

    const handleUsernameChange =(e)=>{
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    };
    
    const handlePasswordChange =(e)=>{
        setPassword(e.target.value);
        setPasswordError(validatePassword(e.target.value));
    };

    const handleConPasswordChange =(e)=>{
        setConPassword(e.target.value);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const validationError=validatePassword(password);
        if(validationError){
            setPasswordError(validationError);
            return;
        } else if(password!=conpassword){
            setPasswordError("Passwords did not match.");
            return;
        }
        
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password); //create a new user with the builtin firebase authentication function
            const user = userCredential.user; //extracts "user" object from UserCredential object
            //more data to display if needed

            const userSetter=await setDoc(doc(db, "users", user.uid),{ //saves the user's username along with the unique usr id

                username: username,
            });
            
            console.log(userSetter, "hello");
            console.log('User Registered:', {username, email});
            onSignUpSuccess();
        
        } catch(error){
            console.error("Error Signing Up", error.message);

            if (error.code === 'auth/email-already-in-use'){
                setPasswordError("Email is already in use. Please use a different email address or log in.");
                
            }  else if (error.code === 'auth/invalid-email') {
                setPasswordError("Invalid email format.");

            } else {
                setPasswordError(error.message);
            }
        }
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

                <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter Email"
                    className="input-field"
                    required
                    />
                  {passwordError && <div className="error-message">{passwordError}</div>}  

                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter a Password"
                    className="input-field"
                    required
                    />
                    
                    {password !== conpassword && conpassword &&(
                        <div className="error-message">Passwords did not match.</div>
                    )}
                <input
                    type="password"
                    value={conpassword}
                    onChange={handleConPasswordChange}
                    placeholder="Re-enter Above Password"
                    className="input-field"
                    required
                    />
                
                    <button type="submit" className="btn-signup">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
