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
            <h2 style={{fontSize: '28px', fontWeight:'bold'}}> What are your interests?</h2>
            <p className="gray-text"> Select the topics you enjoy following.</p>
            <div className="interests-checkboxes">
            <span>
            <label className="custom-checkbox" style={{ width: '380px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 10px', cursor: 'pointer', borderRadius:'10px' }}>
            <input
                type="checkbox"
                id="sports"
                name="sports"
                style={{ position:'fixed', marginLeft:'330px' }}
                onChange={() => handleInterestToggle('Sports')}
            />
            <div className="checkbox-content" style={{marginTop:'2px',fontSize:'25px'}}>
                <img src="sports.png" alt="sports" width="37px" height="37px" style={{marginRight:'105px'}}/>
                Sports
            </div>
            </label>
            <label className="custom-checkbox" style={{ width: '380px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 10px', cursor: 'pointer', borderRadius:'10px' }}>
            <input
                type="checkbox"
                id="politics"
                name="politics"
                style={{ position:'fixed', marginLeft:'330px' }}
                onChange={() => handleInterestToggle('Politics')}
            />
            <div className="checkbox-content" style={{marginTop:'1px',fontSize:'25px'}}>
                <img src="icons8-politics-64.png" alt="politics" width="37px" height="37px" style={{marginRight:'105px'}}/>
                Politics
            </div>
            </label>
            <label className="custom-checkbox" style={{ width: '380px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 10px', cursor: 'pointer', borderRadius:'10px' }}>
            <input
                type="checkbox"
                id="music"
                name="music"
                style={{ position:'fixed', marginLeft:'330px' }}
                onChange={() => handleInterestToggle('Music')}
            />
            <div className="checkbox-content" style={{marginTop:'2px',fontSize:'25px'}}>
                <img src="music.png" alt="Music" width="37px" height="37px" style={{marginRight:'105px'}}/>
                Music
            </div>
            </label>
            <label className="custom-checkbox" style={{ width: '380px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 10px', cursor: 'pointer', borderRadius:'10px' }}>
            <input
                type="checkbox"
                id="celebrity"
                name="celebrity"
                style={{ position:'fixed', marginLeft:'330px' }}
                onChange={() => handleInterestToggle('Celebrity')}
            />
            <div className="checkbox-content" style={{marginTop:'2px',fontSize:'25px'}}>
                <img src="celebrity.png" alt="Celebrity" width="37px" height="37px" style={{marginRight:'105px'}}/>
                Celebrities
            </div>
            </label>
            <label className="custom-checkbox" style={{ width: '380px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 10px', cursor: 'pointer', borderRadius:'10px' }}>
            <input
                type="checkbox"
                id="stocks"
                name="stocks"
                style={{ position:'fixed', marginLeft:'330px' }}
                onChange={() => handleInterestToggle('Stocks')}
            />
            <div className="checkbox-content" style={{marginTop:'2px',fontSize:'25px'}}>
                <img src="stocks.png" alt="Stocks" width="37px" height="37px" style={{marginRight:'105px'}}/>
                Stocks
            </div>
            </label>
            <label className="custom-checkbox" style={{ width: '380px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 10px', cursor: 'pointer', borderRadius:'10px' }}>
            <input
                type="checkbox"
                id="Religion"
                name="Religion"
                style={{ position:'fixed', marginLeft:'330px' }}
                onChange={() => handleInterestToggle('Religion')}
            />
            <div className="checkbox-content" style={{marginTop:'1px',fontSize:'25px'}}>
                <img src="religion.png" alt="Religion" width="37px" height="37px" style={{marginRight:'105px'}}/>
                Religion
            </div>
            </label>
            <label className="custom-checkbox" style={{ width: '380px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 10px', cursor: 'pointer', borderRadius:'10px' }}>
            <input
                type="checkbox"
                id="movies"
                name="movies"
                style={{ position:'fixed', marginLeft:'330px' }}
                onChange={() => handleInterestToggle('Movies')}
            />
            <div className="checkbox-content" style={{marginTop:'1px',fontSize:'25px'}}>
                <img src="icons8-western-64.png" alt="Movies" width="37px" height="37px" style={{marginRight:'105px'}}/>
                Movies
            </div>
            </label>
            <label className="custom-checkbox" style={{ width: '380px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 10px', cursor: 'pointer', borderRadius:'10px' }}>
            <input
                type="checkbox"
                id="Academia"
                name="Academia"
                style={{ position:'fixed', marginLeft:'330px' }}
                onChange={() => handleInterestToggle('Academia')}
            />
            <div className="checkbox-content" style={{marginTop:'2px',fontSize:'25px'}}>
                <img src="academia.png" alt="Academia" width="37px" height="37px" style={{marginRight:'105px'}}/>
                Academia
            </div>
            </label>
            <label className="custom-checkbox" style={{ width: '380px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 10px', cursor: 'pointer', borderRadius:'10px' }}>
            <input
                type="checkbox"
                id="Games"
                name="Games"
                style={{ position:'fixed', marginLeft:'330px' }}
                onChange={() => handleInterestToggle('Games')}
            />
            <div className="checkbox-content" style={{marginTop:'2px',fontSize:'25px'}}>
                <img src="icons8-super-mario-48.png" alt="Games" width="37px" height="37px" style={{marginRight:'105px'}}/>
                Games
            </div>
            </label>
            <label className="custom-checkbox" style={{ width: '380px', height: '50px', display: 'flex', alignItems: 'center', padding: '0 10px', cursor: 'pointer', borderRadius:'10px' }}>
            <input
                type="checkbox"
                id="Food"
                name="Food"
                style={{ position:'fixed', marginLeft:'330px' }}
                onChange={() => handleInterestToggle('Food')}
            />
            <div className="checkbox-content" style={{marginTop:'2px',fontSize:'25px'}}>
                <img src="icons8-food-and-wine-48.png" alt="Food" width="37px" height="37px" style={{marginRight:'105px'}}/>
                Food
            </div>
            </label>
            </span>
            </div>
            <div className='submit' style={{marginTop:'5px', marginLeft:'90px'}}>
                <button className='sign-up-button btn btn-success rounded-button' 
                style={{ fontSize: '17px', width: '200px', borderRadius: '25px', paddingLeft: '20px', paddingRight: '20px' }} 
                onClick={handleInterests}
                type="button" >
                Submit
                </button>   
        </div>
        {noInterests && <div className="error-message" style={{marginLeft:'58px', fontSize:'15px'}}> Please enter your interests. </div>}
        </div>
    );
}

export default InterestsPage;