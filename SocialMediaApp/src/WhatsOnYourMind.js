import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './WhatsOnYourMind.css';

function EmojisModal({emojis}){
    return(
        <div className='emoji-popup'>
            <div className="header" style={{display:'flex', alignItems:'center'}}>
                <button className="back-button">
                    <div className="back">
                        <img src="/back-icon.png" alt="" className="back-icon" width="25" height="25" />
                    </div>
                </button>
                <h2 style={{fontSize:'20px', fontWeight:'bold', marginLeft:'85px'}}>How are you feeling?</h2>
            </div>
            <hr className="horizontal-line-2" />
            <div className="emoji-searchbox">
                <input
                    type="text"
                    placeholder="&#128269;  Search"
                    className="form-control rounded-pill"   
                />
            </div>
            <div className="row1">
                <div className="happy-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[8].character}
                        </div>
                        <div className="emoji-button-text">happy</div>
                    </button>
                    <span/>
                </div>
                <div className="relieved-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[50].character}
                        </div>
                        <div className="emoji-button-text">relieved</div>
                    </button>
                    <span/>
                </div>
                <div className="loved-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[14].character}
                        </div>
                        <div className="emoji-button-text">loved</div>
                    </button>
                    <span/>
                </div>
            </div>
            <div className="row2">
                <div className="sad-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[75].character}
                        </div>
                        <div className="emoji-button-text">sad</div>
                    </button>
                    <span/>
                </div>
                <div className="thankful-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[2].character}
                        </div>
                        <div className="emoji-button-text">thankful</div>
                    </button>
                    <span/>
                </div>
                <div className="excited-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[16].character}
                        </div>
                        <div className="emoji-button-text">excited</div>
                    </button>
                    <span/>
                </div>
            </div>
            <div className="row3">
                <div className="in-love-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[15].character}
                        </div>
                        <div className="emoji-button-text">in love</div>
                    </button>
                    <span/>
                </div>
                <div className="crazy-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[26].character}
                        </div>
                        <div className="emoji-button-text">crazy</div>
                    </button>
                    <span/>
                </div>
                <div className="blessed-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[13].character}
                        </div>
                        <div className="emoji-button-text">blessed</div>
                    </button>
                    <span/>
                </div>
            </div>
            <div className="row4">
                <div className="blissful-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[12].character}
                        </div>
                        <div className="emoji-button-text">blissful</div>
                    </button>
                    <span/>
                </div>
                <div className="fantastic-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[3].character}
                        </div>
                        <div className="emoji-button-text">fantastic</div>
                    </button>
                    <span/>
                </div>
                <div className="silly-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[27].character}
                        </div>
                        <div className="emoji-button-text">silly</div>
                    </button>
                    <span/>
                </div>
            </div>
            <div className="row5">
                <div className="celebratory-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[67].character}
                        </div>
                        <div className="emoji-button-text">festive</div>
                    </button>
                    <span/>
                </div>
                <div className="cool-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[69].character}
                        </div>
                        <div className="emoji-button-text">cool</div>
                    </button>
                    <span/>
                </div>
                <div className="tired-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[97].character}
                        </div>
                        <div className="emoji-button-text">tired</div>
                    </button>
                    <span/>
                </div>
            </div>
            <div className="row6">
                <div className="sick-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[56].character}
                        </div>
                        <div className="emoji-button-text">sick</div>
                    </button>
                    <span/>
                </div>
                <div className="different-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[68].character}
                        </div>
                        <div className="emoji-button-text">different</div>
                    </button>
                    <span/>
                </div>
                <div className="smart-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[70].character}
                        </div>
                        <div className="emoji-button-text">smart</div>
                    </button>
                    <span/>
                </div>
            </div>
            <div className="row7">
                <div className="confused-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[73].character}
                        </div>
                        <div className="emoji-button-text">confused</div>
                    </button>
                    <span/>
                </div>
                <div className="worried-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[74].character}
                        </div>
                        <div className="emoji-button-text">worried</div>
                    </button>
                    <span/>
                </div>
                <div className="shocked-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[77].character}
                        </div>
                        <div className="emoji-button-text">shocked</div>
                    </button>
                    <span/>
                </div>
            </div>
            <div className="row8">
                <div className="embarrassed-emoji-button">
                    <button className="embarrassed-emoji-button">
                        <div className="emoji">
                            {emojis[32].character}
                        </div>
                        <div className="emoji-button-text">embarrassed</div>
                    </button>
                    <span/>
                </div>
                <div className="scared-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[85].character}
                        </div>
                        <div className="emoji-button-text">scared</div>
                    </button>
                    <span/>
                </div>
                <div className="cold-emoji-button">
                    <button className="emoji-button">
                        <div className="emoji">
                            {emojis[62].character}
                        </div>
                        <div className="emoji-button-text">cold</div>
                    </button>
                    <span/>
                </div>
            </div>
        </div>
    );
}

function WhatsOnYourMind ({onClose}){
    const avatarURL = localStorage.getItem('avatar');
    const firstnameUser = localStorage.getItem('firstname');
    const lastnameUser = localStorage.getItem('lastname');
    const [postContent, setPostContent] = useState('');
    const fileInputRef = useRef(null);
    const [emojis, setEmojis] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTextareaChange = (event) => {
        setPostContent(event.target.value);
      };


      const handlePhotoVideoClick = () => {
        // Trigger a click event on the file input element
        fileInputRef.current.click();
      };

      const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
      };

      const handleFeelingClick = async () => {
        try {
          // Make an API request with the API key in the headers
          const response = await axios.get('https://emoji-api.com/emojis?access_key=8b56d76139a2c1719aad6045d2a777bb1f336132');
    
          // Extract the emoji list from the response data
          const emojiList = response.data;
          console.log(emojiList);
          setEmojis(emojiList);
          setIsModalOpen(true);
        } catch (error) {
          console.error('Error fetching emojis:', error);
        }
      };

      const handleLocationClick = () =>{

      };

      const handleGIFClick = () => {

      };

    return(
        <div className="whats-on-your-mind-popup">
            <button className="close-button" onClick={onClose}>
                <img src="/x-icon.webp" alt="" className="x-icon" width="25" height="25" />
            </button>
            <div className="heading d-flex align-items-center">
                <div className="whats-on-your-mind-avatar">
                    <Link to="/newUser">
                        <img src={avatarURL} alt="" className="avatar" width="50" height="50" />
                    </Link>
                </div>
                <div className="userName" style={{marginLeft:'10px', fontWeight:'bold'}}>
                    {`${firstnameUser} ${lastnameUser}`}
                </div>
            </div>
            <div className="input-field">
            <textarea
                placeholder={`What's on your mind, ${firstnameUser}?`}
                className="form-control"
                style={{height:'300px',resize: 'none', fontWeight:'normal'}}
                value={postContent}
                onChange={handleTextareaChange}
            />
            </div>
            <div className="add-to-post" style={{display:'flex'}}>
                <button className="add-to-post-button btn d-flex justify-content-end"
                style={{border:'white', fontSize:'18px',marginTop:'7px', marginLeft:'10px', fontWeight:'bold'}}>
                    Add to your post
                </button>
                <span/>
                <div className="photo-button" style={{marginRight:'3px'}}>
                    <button className="btn" style={{border:'gray'}} onClick={handlePhotoVideoClick}>
                        <img src="img-icon.png" alt="pic-Icon" width="30" height="30" style={{marginTop:'4px'}}/>
                    </button>
                    <span className="tooltip-photo" style={{fontSize:'12px'}}>Photo/video</span>
                    <input
                    type="file"
                    accept="image/*, video/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                    />
                </div>
                <div className="feeling-button" style={{marginRight:'3px'}}>
                    <button className="feeling-button btn" 
                        style={{border:'gray'}}
                        onClick={handleFeelingClick}>
                        <img src="emji-icon.png" alt="emoji-Icon" width="30" height="30" style={{marginTop:'5px'}}/>
                    </button>
                    <span className="tooltip-feel" style={{fontSize:'12px'}}>Feeling</span>
                </div>
                {isModalOpen && <EmojisModal emojis={emojis}/>}
                <div className="location-button">
                    <button className="location-button btn" 
                        style={{border:'gray'}}
                        onClick={handleLocationClick}>
                        <img src="icons8-location.gif" alt="location-Icon" width="30" height="30" style={{marginTop:'3.5px'}}/>
                    </button>
                    <span className="tooltip-loc" style={{fontSize:'12px'}}>Location</span>
                </div>
                <div className="gif-button">
                    <button className="gif-button btn" 
                        style={{border:'gray'}}
                        onClick={handleGIFClick}>
                        <img src="giph.png" alt="GIF-Icon" width="30" height="30" style={{marginTop:'3.5px'}}/>
                    </button>
                    <span className="tooltip" style={{fontSize:'13px'}}>GIF</span>
                </div>
            </div>
            <div className="post-button">
                <button className="post btn btn-primary d-flex justify-content-center" 
                type="button"
                style={{ marginTop:'15px',fontSize: '17px', width: '460px' }}
                disabled={!postContent}>
                    Post
                </button>
                <span/>
            </div>
        </div>
    )
}

export default WhatsOnYourMind;