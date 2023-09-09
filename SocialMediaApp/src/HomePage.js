import React, {useState} from 'react';
import "./HomePage.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import WhatsOnYourMind from './WhatsOnYourMind';

function CreateStoryButton() {
    const handleFileUpload = (event) => {
      const file = event.target.files[0]; // Get the selected file
      if (file) {

      }
    };
  
    return (
      <label htmlFor="file-upload" className="create-story-button">
        <div className="button-content" onClick={() => document.getElementById('file-upload').click()}>
          <div className="create-story-content">
            <div className="icon-container" style={{ marginTop: '0px', marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faPlus} style={{ color: 'blue' }} />
            </div>
            <div className="create-story-text" style={{ marginBottom: '20px', marginLeft: '200px', fontSize: '20px', fontWeight: 'bold' }}>
              Create story
            </div>
          </div>
          <div className="gray-text" style={{ marginBottom: '15px', marginLeft: '180px', fontSize: '16px' }}>Share a photo or write something.</div>
        </div>
        <div className="input-wrapper">
          <input
            type="file"
            id="file-upload"
            accept="image/*,video/*"
            style={{ display: 'none' }}
            className='input-field'
            onChange={handleFileUpload}
          />
        </div>
    </label> 
    );
  }  

function HomePage () {
    const avatarURL = localStorage.getItem('avatar');
    const firstnameUser = localStorage.getItem('firstname');
    const [showPopup, setShowPopup] = useState(false);

    const handleWhatsOnYourMind = () =>{
      setShowPopup(!showPopup);
    }

    return(
      <div>
        {showPopup && (
              <div className="whats-on-your-mind-popup">
                <WhatsOnYourMind onClose={handleWhatsOnYourMind} />
            </div>)}
        <div className={`background-container ${showPopup ? 'blurred-background':''}`}>
            <div className="navbar-container">
                <nav className="navbar">
                    <a className="navbar-brand" href="/home">
                        <img src="/bulle.png" alt="" width="50" height="50" />
                    </a>
                    <div className="d-flex justify-content-center rounded-search-box">
                        <input
                        type="text"
                        placeholder="&#128269;  Search Thoughts"
                        className="form-control rounded-pill"   
                        />
                    </div>
                    <div className="avatar">
                        <Link to="/newUser">
                            <img src={avatarURL} alt="" className="avatar" width="50" height="50" />
                        </Link>
                    </div>
                </nav>
            </div>
            <div className="body" style={{marginTop:'15px'}}>
                <div className="d-flex justify-content-center">
                    <div className="create-story">
                        <CreateStoryButton />
                    </div>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:'15px'}}>
                <div className="whats-on-your-mind d-flex align-items-center">
                    <div className="avatar">
                        <Link to="/newUser">
                            <img src={avatarURL} alt="" className="avatar" width="50" height="50" />
                        </Link>
                    </div>
                  <div className='whats-on-your-mind-search-box'>
                    <input
                      type="text"
                      placeholder={`What's on your mind, ${firstnameUser}?`}
                      className="form-control rounded-pill"
                      onClick={handleWhatsOnYourMind}
                      readOnly
                    />
                    <hr className="horizontal-line" />
                  </div> 
                </div>
                </div>
            </div>
        </div>
      </div>
    )
}

export default HomePage;