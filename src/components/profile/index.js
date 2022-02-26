import React from 'react';
import { useSelector } from 'react-redux';

import LogIn from './login';
import ProfileInfo from './profile';

import './index.css';

const Profile = () => {
    const loggedIn = useSelector((state) => state.UserDuck.activeUser)

    return (
        <div className='profile-page global-container'>
            {!loggedIn ? (
                <LogIn
                />
            ) : (
                <ProfileInfo
                />
            )}
        </div>
    );
};

export default Profile;
