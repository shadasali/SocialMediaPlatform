import React, {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InterestsPage.css';

function InterestsPage ({firstName, lastName, email, onClose}) {
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [noInterests, setNoInterests] = useState(false);

    const handleInterestToggle = (interest) => {
        if (selectedInterests.includes(interest)) {
          setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
          setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleInterests = async () =>{
        if (selectedInterests.length !== 0){
            const response = await axios.post(`http://localhost:8000/userInterests?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&interests=${encodeURIComponent(selectedInterests)}}`);
            onClose();
        }
        else{
            setNoInterests(true);
        }

    }
    return(
        <div className="interests-popup">
            <h2 style={{fontSize: '30px', fontWeight:'bold'}}> What are your interests?</h2>
            <p className="gray-text"> Select the topics you enjoy.</p>
            <div className="interests-checkboxes">
            <span>
                <input type="checkbox" id="sports" name="sports" onChange = {() => handleInterestToggle('Sports')} style={{marginLeft:'5px'}}/>  <label style={{fontFamily:'Klavika', fontSize:'17px'}}> Sports </label>   
                <input type="checkbox" id="politics" name="politics" checked={selectedInterests.includes('Politics')} onChange = {() => handleInterestToggle('Politics')} /> <label style={{fontFamily:'Klavika', fontSize:'17px'}}> Politics </label>
                <br></br>
                
                <input type="checkbox" id="music" name="music" checked={selectedInterests.includes('Music')} onChange = {() => handleInterestToggle('Music')} style={{marginLeft:'5px'}}/> <label style={{fontFamily:'Klavika', marginLeft:'6px', fontSize:'17px'}}> Music </label>
                <input type="checkbox" id="celebrities" name="celebrities" checked={selectedInterests.includes('Celebrities')} onChange = {() => handleInterestToggle('Celebrities')}/>  <label style={{fontFamily:'Klavika', fontSize:'17px'}}> Celebrities </label>
                <br></br>

                <input type="checkbox" id="stocks" name="stocks" checked={selectedInterests.includes('Stocks')} onChange = {() => handleInterestToggle('Stocks')} style={{marginLeft:'5px'}}/> <label style={{fontFamily:'Klavika', marginRight:'88px', fontSize:'17px'}}> Stocks </label> 
                <input type="checkbox" id="religion" name="religion" checked={selectedInterests.includes('Religion')} onChange = {() => handleInterestToggle('Religion')}/> <label style={{fontFamily:'Klavika', fontSize:'17px'}}> Religion </label>
                <br></br>

                <input type="checkbox" id="movies" name="movies" checked={selectedInterests.includes('Movies')} onChange = {() => handleInterestToggle('Movies')} style={{marginLeft:'3px'}}/> <label style={{fontFamily:'Klavika', marginRight:'87px', fontSize:'17px'}}> Movies </label>
                <input type="checkbox" id="academia" name="academia" checked={selectedInterests.includes('Academia')} onChange = {() => handleInterestToggle('Academia')}/> <label style={{fontFamily:'Klavika', fontSize:'17px'}}> Academia </label> 
                <br></br>

                <input type="checkbox" id="movies" name="movies" checked={selectedInterests.includes('Games')} onChange = {() => handleInterestToggle('Games')} style={{marginLeft:'3px'}}/> <label style={{fontFamily:'Klavika', fontSize:'17px'}}> Games </label>
                <input type="checkbox" id="academia" name="academia" checked={selectedInterests.includes('Food')} onChange = {() => handleInterestToggle('Food')}/> <label style={{fontFamily:'Klavika', fontSize:'17px'}}> Food </label> 
            </span>
            </div>
            <div className='d-flex' style={{marginTop:'15px', marginLeft:'50px'}}>
        <button className='sign-up-button btn btn-success rounded-button' 
        style={{ fontSize: '17px', width: '200px', borderRadius: '25px', paddingLeft: '20px', paddingRight: '20px' }} 
        onClick={handleInterests}
        type="button" > Submit
        </button>   
        </div>
        {noInterests && <div className="error-message" style={{marginLeft:'58px', fontSize:'15px'}}> Please enter your interests. </div>}
        </div>
    );
}

export default InterestsPage;