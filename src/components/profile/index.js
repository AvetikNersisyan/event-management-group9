/* eslint-disable prettier/prettier */
import React from 'react';
import './index.css';
import LogIn from './login';
import ProfileInfo from './profile';

const Profile = ({ loggedIn, setLoggedIn, activeUser, setActiveUser }) => {

    return (
        <div className='profilePage'>
            {!loggedIn ? (
                <LogIn
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    setActiveUser={setActiveUser}
                />
            ) : (
                <ProfileInfo
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    activeUser={activeUser}
                    setActiveUser={setActiveUser}
                />
            )}
        </div>
    );
};

export default Profile;
