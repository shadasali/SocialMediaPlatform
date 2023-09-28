import React from 'react';
import './ProfilePage.css';

function ProfilePage (){
    const avatarURL = localStorage.getItem('avatar');
    const firstnameUser = localStorage.getItem('firstname');
    const lastnameUser = localStorage.getItem('lastname');

    return(
        <div>
            <div className='profile-header'>
                <div className="profile-avatar">
                    <button className='profile-avatar-button'>
                        <img src={avatarURL} alt="" className="avatar" width="120" height="120" />
                    </button>
                    <h2 className='profile-text'>{firstnameUser} {lastnameUser}</h2>
                </div>
                <hr className="horizontal-line-2" />
            </div>
        </div>
    );
}

export default ProfilePage;