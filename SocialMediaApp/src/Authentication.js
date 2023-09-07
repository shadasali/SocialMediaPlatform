import React, {useState, useEffect} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Authenticate.css';
import axios from 'axios';
import {isEmail} from 'validator';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';


function Authentication () {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidEmailFormat, setInvalidEmailFormat] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
    const navigate = useNavigate();

    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const validateInputs = () => {
        const errors = {};
      
        // Check each input field for empty values
        if (email.trim() === '') {
            setInvalidEmailFormat(false);
            setInvalidEmail(false);
          errors.email = 'Email is required';
        }
        if (password.trim() === '') {
            setInvalidPassword(false);
          errors.password = 'Password is required';
        }
      
        // Update the validation errors state
        setValidationErrors(errors);
      
        // Return true if there are no validation errors
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        
        if (storedEmail) {
          setEmail(storedEmail);
        }
      }, []);

      const handleRememberMeChange = (event) =>{
        setRememberMe(event.target.checked);
      }

    const handleAuthentication = async () =>{
        const isValid = validateInputs();
        if (isValid){
            try{
                if(!isEmail(email)){
                    setHasErrors(true);
                    setInvalidEmailFormat(true);
                    setInvalidEmail(false);
                    setInvalidPassword(false);
                    return;
                }
                const response = await axios.post(`http://localhost:8000/verifyUser?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);

                if (response.data.success){
                    if (rememberMe) {
                        localStorage.setItem('userEmail', email);
                    }
                    localStorage.setItem('avatar', response.data.avatar);
                    localStorage.setItem('firstname', response.data.firstname);
                    navigate('/home');
                }else{

                    if(response.data.error === 'EMAIL_NOT_FOUND'){
                        setHasErrors(true);
                        setInvalidPassword(false);
                        setInvalidEmail(true);
                        setInvalidEmailFormat(false);
                    }
                    else if(response.data.error ==='INVALID_PASSWORD'){
                        setHasErrors(true);
                        setInvalidEmail(false);
                        setInvalidPassword(true);
                        setInvalidEmailFormat(false);
                    }
                }
            } catch(error){
                console.log('Error verifying user:', error);
            }
        }
        else{
            setHasErrors(true);
            return;
        }
    }

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    const handleForgotPasswordClick = (event) => {
        event.preventDefault();
        setShowForgotPasswordPopup(!showForgotPasswordPopup);
    };

    const errorCount = Object.keys(validationErrors).length;
    const hasInvalidPassword = invalidPassword ? 1 : 0;
    const hasInvalidEmail = invalidEmail ? 1 : 0 || invalidEmailFormat ? 1 : 0; 
    const heightIncrease = (errorCount + hasInvalidEmail + hasInvalidPassword) * 20;

    return(
        <div className="background">
        <div className="container">
        <div className="welcome-container">
            <h1 style={{ color: 'black', fontWeight: 'bold', fontSize: '62px', fontFamily:'Pico Alphabet' }}> ThoughtBubble </h1>
         </div>
         <div className="welcome-container_two">
            <h2 style={{ color: 'black', fontWeight: 'bold', fontSize: '28px', fontFamily:'Klavika' }}> a public forum for the world </h2>
         </div>
            <div className={`Authenticate ${hasErrors ? 'error' : ''} border rounded p-3`} style={{ '--height-increase': `${heightIncrease}px` }}>
                <div className="authentication-container">
                <div className='authentication-section'>
                    <label htmlFor='Email' className='Email'>
                        <input type = "text" placeholder="Email" value={email} onChange={handleEmail} className={`custom-input ${validationErrors.email ? 'input-error' : ''}`} style={{width:'300px', paddingRight: '2.5rem'}} />
                        {validationErrors.email && <div className="error-message" style={{fontSize:'13px'}}>{validationErrors.email}</div>}
                        {invalidEmail && <div className="error-message" style={{fontSize:'13px'}}>Email does not exist, create a new account!</div>}
                        {invalidEmailFormat && <div className="error-message" style={{fontSize:'13px'}}>Please enter a valid email</div>}   
                    </label>
                </div>
                <div className='authentication-section'>
                    <label htmlFor='Password' className='passWord'>
                    <div className="password-input-container">
                        <input type={showPassword ? 'password' : 'text'} placeholder="Password" value = {password} onChange={handlePasswordChange} className={`custom-input ${validationErrors.password ? 'input-error' : ''}`} style={{width:'300px'}}></input>
                        {showPassword ? (
                            <FaEyeSlash className={`password-icon ${hasErrors ? 'error' : ''}`} onClick={togglePasswordVisibility} />
                            ) : (
                            <FaEye className= {`password-icon ${hasErrors ? 'error' : ''}`} onClick={togglePasswordVisibility} />
                        )}
                        {validationErrors.password && <div className="error-message" style={{fontSize:'13px'}}>{validationErrors.password}</div>}
                        {invalidPassword && <div className="error-message" style={{fontSize:'13px'}}>Incorrect password</div>}
                    </div>
                    </label>
                </div>
                </div>
                <div className="d-flex justify-content-center">
                <button className="btn btn-primary rounded-button" 
                type="button" 
                onClick={handleAuthentication} 
                style={{ fontSize: '17px', width: '300px', borderRadius: '25px', paddingLeft: '20px', paddingRight: '20px' }}>
                Sign in
                </button>
                <span/>
                </div>
                <br></br>

                <div className="form-check">
                <input className="form-check-input" style={{marginLeft: '15px'}} type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} id="remember-checkbox" />
                <label className="form-check-label" style={{marginLeft: '7.5px'}} htmlFor="remember-checkbox">
                Remember me
                </label>
                <Link to="/forgotPassword" className="forgot-link" onClick={handleForgotPasswordClick} style={{marginLeft: '80px', textDecoration: 'none'}}>Forgot Password?</Link>
                {showForgotPasswordPopup && <div className="overlay"></div>}
                {showForgotPasswordPopup && <ForgotPassword onClose={handleForgotPasswordClick} />}
                </div>
                
                <div className="line-section">
                <hr className="horizontal-line" />
                <span className="or-text">OR</span>
                <hr className="horizontal-line" />
                </div>
                
                <div className="d-flex justify-content-center">
                    <button className="create-account-button btn btn-success rounded-button" 
                    type="button"
                    onClick={togglePopup}
                    style={{ fontSize: '17px', width: '300px', borderRadius: '25px', paddingLeft: '20px', paddingRight: '20px' }}>
                    Create new account
                    </button>
                    <span/>
                    {showPopup && <div className="overlay"></div>}
                    {showPopup && <CreateAccount onClose={togglePopup} />}
                </div>
            </div>
        </div>
        </div>
    );
}

export default Authentication;