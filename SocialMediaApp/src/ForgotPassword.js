import React, {useState} from 'react';
import { getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import {isEmail} from 'validator';
import './firebase.js';
import './CreateAccount.css';

function ForgotPassword({ onClose }) {
    const [email, setEmail] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidEmailFormat, setInvalidEmailFormat] = useState(false);

    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }

    const validateInputs = () => {
        const errors = {};
      
        // Check each input field for empty values
        if (email.trim() === '') {
          errors.email = 'Email is required';
        }
      
        // Update the validation errors state
        setValidationErrors(errors);
      
        // Return true if there are no validation errors
        return Object.keys(errors).length === 0;
    };

    const handleForgotPassword = async () =>{
        const isValid = validateInputs();

        if (isValid){
            try{
                
                if (!isEmail(email)) {
                    setInvalidEmailFormat(true);
                    setInvalidEmail(false);
                    return;
                }

                const auth = getAuth();
                const signInMethods = await fetchSignInMethodsForEmail(auth, email);

                if (signInMethods.length === 0){
                    setInvalidEmail(true);
                    setInvalidEmailFormat(false);
                    return;
                }
                else{
                    // Send the password reset email using Firebase Authentication
                    await sendPasswordResetEmail(auth, email);
                }
            } catch(error){
                console.error('Error sending password reset email:', error);
            }
        }
    }
  return (
    <div className="popup">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <h2 style={{fontSize:'30px', fontWeight:'bold'}}>Forgot your password?</h2>
      <p className="gray-text" >Let's reset it.</p>
      <div className='forgot-password-section'>
            <label htmlFor='Email' className='Email'>
                <input type = "text" placeholder="Email Address" value={email} onChange={handleEmail} className={`custom-input ${validationErrors.email ? 'input-error' : ''}`} style={{width:'360px', paddingRight: '2.5rem'}} />
                {validationErrors.email && <div className="error-message" style={{fontSize:'13px'}}>{validationErrors.email}</div>}
                {invalidEmail && <div className="error-message" style={{fontSize:'13px'}}>Email does not exist</div>}
                {invalidEmailFormat && <div className="error-message" style={{fontSize:'13px'}}>Please enter a valid email</div>}
            </label>
        </div>
        <br></br>
        <div className="d-flex justify-content-center">
            <button className="btn btn-success rounded-button" 
                type="button" 
                onClick={handleForgotPassword} 
                style={{ fontSize: '17px', width: '200px', borderRadius: '25px', paddingLeft: '20px', paddingRight: '20px' }} >
                Submit
            </button>
            <span/>
        </div>
    </div>
  );
}

export default ForgotPassword;