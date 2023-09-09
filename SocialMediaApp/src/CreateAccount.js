import React, {useState} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {isEmail} from 'validator';
import { getAuth, fetchSignInMethodsForEmail} from 'firebase/auth';
import axios from 'axios';
import './firebase.js';
import './CreateAccount.css';
import InterestsPage from './InterestsPage.js';

function CreateAccount({ onClose }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const validateInputs = () => {
    const errors = {};
  
    // Check each input field for empty values
    if (firstName.trim() === '') {
      errors.firstName = 'First name is required';
    }
    if (lastName.trim() === '') {
      errors.lastName = 'Last name is required';
    }
    if (email.trim() === '') {
      setInvalidEmail(false);
      errors.email = 'Email is required';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    }
  
    // Update the validation errors state
    setValidationErrors(errors);
  
    // Return true if there are no validation errors
    return Object.keys(errors).length === 0;
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };  

  const handleNewUser = async (e) => {
    const isValid = validateInputs();
    if (isValid){
      try{
          if (!isEmail(email)) {
              setInvalidEmail(true);
              setEmailExists(false);
              return;
          }
          const fullName = `${firstName} ${lastName}`;
          const auth = getAuth();

          const signInMethods = await fetchSignInMethodsForEmail(auth, email);

          if (signInMethods.length > 0) {
              setEmailExists(true);
              setInvalidEmail(false); 
              return;
          }

          const response = await axios.post(`http://localhost:8000/createUser?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&fullname=${encodeURIComponent(fullName)}`);

          if (response.data.success === false){
              setInvalidEmail(true);
              setEmailExists(false);
          }
          else{
            setCurrentPage(2);
          }

      } catch(error){
          console.log('Error creating new user:', error);
      }
  }
  else{
      return;
  }
  };

  return (
    <div className="popup">
      <button className="close-button" onClick={onClose}>
        <img src="/x-icon.webp" alt="" className="x-icon" width="25" height="25" />
      </button>
      {currentPage === 1 && (
      <div className="newUser-container">
        <h2 style={{fontWeight:'bold'}}>Sign Up</h2>
        <p className="gray-text" >It's quick and easy.</p>
      <div className="name-inputs">
      <div className="newUser-section">
        <label>
          <input
            type="text"
            placeholder='First name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`custom-input ${validationErrors.firstName ? 'input-error' : ''}`} style={{width:'175px', paddingRight: '2.5rem'}}
          />
          {validationErrors.firstName && <div className="error-message" style={{fontSize:'13px'}}>{validationErrors.firstName}</div>}
        </label>
        </div>
        <div className="newUser-section">
        <label>
          <input
            type="text"
            placeholder='Last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`custom-input ${validationErrors.lastName ? 'input-error' : ''}`} style={{width:'175px', paddingRight: '2.5rem'}}
          />
          {validationErrors.lastName && <div className="error-message" style={{fontSize:'13px'}}>{validationErrors.lastName}</div>}
        </label>
        </div>
        </div>
        <br></br>
        <div className="newUser-section">
        <label>
          <input
            type="text"
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`custom-input ${validationErrors.email ? 'input-error' : ''}`} style={{width:'360px', paddingRight: '2.5rem'}}
          />
          {validationErrors.email && <div className="error-message" style={{fontSize:'13px'}}>{validationErrors.email}</div>}
          {invalidEmail && <div className="error-message" style={{fontSize:'13px'}}>Please enter a valid email</div>}
          {emailExists && <div className="error-message" style={{fontSize:'13px'}}>This email already exists </div>}
        </label>
        </div>
        <br></br>
        <div className="newUser-section">
        <label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'password' : 'text'}
            placeholder='New password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`custom-input ${validationErrors.password ? 'input-error' : ''}`} style={{width:'360px', paddingRight: '2.5rem'}}
          />
          {showPassword ? (
            <FaEyeSlash className="password-icon" onClick={togglePasswordVisibility} />
            ) : (
            <FaEye className="password-icon" onClick={togglePasswordVisibility} />
          )}
          </div>
          {validationErrors.password && <div className="error-message" style={{fontSize:'13px'}}>{validationErrors.password}</div>}
        </label>
        </div>
        <br></br>
        <div className='d-flex justify-content-center'>
        <button className='sign-up-button btn btn-success rounded-button' 
        style={{ fontSize: '17px', width: '200px', borderRadius: '25px', paddingLeft: '20px', paddingRight: '20px' }} 
        onClick={handleNewUser}
        type="button" >Sign up
        </button>
        </div>
      </div>
      )}
      {currentPage === 2 && (
        <InterestsPage firstName={firstName} lastName = {lastName} email = {email} onClose={onClose} />
      )}
    </div>
  );
}

export default CreateAccount;
