/* eslint-disable prettier/prettier */
import React from 'react';
import './index.css';
import LogIn from './login';
import ProfileInfo from './profile';

const Profile = ({ users, loggedIn, setLoggedIn, activeUser, setActiveUser }) => {

    return (
        <div className='profilePage'>
            {!loggedIn ? (
                <LogIn
                    users={users}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    setActiveUser={setActiveUser}
                />
            ) : (
                <ProfileInfo
                    activeUser={activeUser}
                    setActiveUser={setActiveUser}
                />
            )}
        </div>
    );
};

export default Profile;
