import React, {useState, useEffect, useRef} from 'react';
import "./HomePage.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import WhatsOnYourMind from './WhatsOnYourMind';
import Map from './map';
import Navigation from './navigation';

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
            <div className="icon-container" style={{marginTop: '0px', marginLeft: '10px' }}>
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
    const lastnameUser=localStorage.getItem('lastname');
    const [showPopup, setShowPopup] = useState(false);
    const [showGoLivePopup, setShowGoLivePopup] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [posts, setPosts] = useState([]);

    const fileInputRef = useRef(null);

    const handleWhatsOnYourMind = () =>{
      setShowPopup(!showPopup);
    }

    const handleOpenModal = (openmodal)=>{
      setOpenModal(openmodal);
    }

    const handleSelectedFile=(selectedfile)=>{
      setSelectedFile(selectedfile);
    }

    const handlePost = (postData) => {
      // Append the new post to the existing list of posts
      const newPost = {
        content: postData.text,
        gif: postData.gif,
        files: postData.files,
        location: postData.location,
        feeling: postData.feeling,
      };
  
      // Update the state with the new list of posts
      setPosts([...posts, newPost]);
    };
  
    const handlePhotoVideoClick = () => {
      // Trigger a click event on the file input element
      fileInputRef.current.click();
    };

    const handleFileUpload = (event) => {
      setSelectedFile(event.target.files[0]);
      setShowPopup(true);
    };

    const handleFeelingClick = () => {
      setShowPopup(true);
      setOpenModal(true);
    };

    const handleGoLiveButtonClick =() =>{
      setShowGoLivePopup(!showGoLivePopup);
    }

    return(
      <div>
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
                        <Link to="/profile">
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
                        <Link to="/profile">
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
                    <div className="add-ons">
                          <div className="feeling" style={{marginLeft:'6px',alignItems:'center'}}>
                              <button className="feeling-button btn" 
                              style={{ border:'gray',fontSize: '15px', color:'gray', fontWeight:'bold', width:'200px' }}
                              onClick={handleFeelingClick}>
                                <img src="emji-icon.png" alt="emoji-Icon" width="22" height="22" style={{marginBottom:'1px', marginRight:'8px'}}/>
                                 Feeling
                              </button>
                              <span/>
                          </div>
                          <div className="photo-video" style={{alignItems:'center'}}>
                              <button className="post-photo-video-button btn" 
                              style={{ border:'gray', fontSize: '15px', color:'gray', fontWeight:'bold', width:'200px' }}
                              onClick={handlePhotoVideoClick}>
                                <img src="img-icon.png" alt="pic-Icon" width="22" height="22" style={{marginBottom:'6px', marginRight:'8px'}}/>
                                 Photo/video
                              </button>
                              <span/>
                              <input
                                  type="file"
                                  accept="image/*, video/*"
                                  ref={fileInputRef}
                                  style={{ display: 'none' }}
                                  onChange={handleFileUpload}
                              />
                          </div>
                          <div className="live-video" style={{alignItems:'center'}}>
                              <button className="post-live-button btn" 
                              style={{ border:'gray', fontSize: '15px', color:'gray', fontWeight:'bold', width:'200px' }}
                              onClick={handleGoLiveButtonClick}>
                                <img src="video-icon.png" alt="go-live-Icon" width="22" height="22" style={{marginBottom:'1px', marginRight:'8px'}}/>
                                 Live video
                              </button>
                              <span/>
                          </div>
                    </div>
                  </div> 
                </div>
                </div>
                  { posts.length > 0 && (
                  posts.map((post, index) => (
                  <div className="post-content" key={index} style={{marginLeft:'375px',marginTop:'15px'}}>
                    <div className="content" style={{ display: 'flex' }}>
                      <div className="avatar">
                        <Link to="/profile">
                          <img src={avatarURL} alt="" className="avatar" width="50" height="50" />
                        </Link>
                      </div>
                      <div className="userName" style={{ marginTop: '10px', marginLeft: '10px', fontWeight: 'bold' }}>
                        {`${firstnameUser} ${lastnameUser}`}
                      </div>
                      {post.feeling && (
                        <div className="feeling-status" style={{ marginTop: '10px', marginLeft: '2px', fontWeight: 'bold' }}>
                          is {post.feeling.character} feeling {post.feeling.text}.
                        </div>
                      )}
                      {post.location && (
                        <div className={`location-status ${post.location.name.split(',')[1].length > 12 ? 'smallerText' : ''}`} style={{ marginTop: '10px' }}>
                          is in {post.location.name.split(',')[0]}, {post.location.name.split(',')[1]}
                        </div>
                      )}
                    </div>
                    <div style={{ marginLeft: '10px' }}>{post.content && <div>{post.content}</div>}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                      {post.gif && <img key={post.gif.id} src={post.gif.src} alt={post.gif.alt} width="90%" />}
                    </div>
                    <div className="selected-media-container">
                      {post.files.length > 0 && (
                        <div className="selected-media">
                          {post.files.map((file, fileIndex) => (
                            <div className="selected-media-item" key={fileIndex}>
                              {file.type === 'video/mp4' || file.type === 'video/webm' || file.type === 'video/quicktime' ? (
                                <video controls width="101%">
                                  <source src={file.url} type={file.type} />
                                  Your browser does not support the video tag.
                                </video>
                              ) : (
                                <img src={file.url} alt={`Selected ${fileIndex}`} width="101%" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {post.location && post.files.length === 0 && (
                      <Map selectedCity={post.location}>
                        <Navigation />
                      </Map>
                    )}
                    </div>
                  )))}
            </div>
        </div>
        {showPopup && (
              <div className="whats-on-your-mind-popup">
                <WhatsOnYourMind onClose={()=>setShowPopup(!showPopup)} openModal={openModal} onOpenModal={handleOpenModal} onSelectedFile={handleSelectedFile} selection={selectedFile} onPost={handlePost}/>
            </div>)}
      </div>
    )
}

export default HomePage;