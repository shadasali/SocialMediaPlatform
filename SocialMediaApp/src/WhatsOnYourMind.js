import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './WhatsOnYourMind.css';

function WhatsOnYourMind ({onClose}){
    const avatarURL = localStorage.getItem('avatar');
    const firstnameUser = localStorage.getItem('firstname');
    const lastnameUser = localStorage.getItem('lastname');
    const [postContent, setPostContent] = useState('');
    
    
    const handleTextareaChange = (event) => {
        setPostContent(event.target.value);
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
            <div className="post-button">
                <button className="post btn btn-primary d-flex justify-content-center" 
                type="button"
                style={{ fontSize: '17px', width: '460px' }}
                disabled={!postContent}>
                    Post
                </button>
                <span/>
            </div>
        </div>
    )
}

export default WhatsOnYourMind;