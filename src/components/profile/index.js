/* eslint-disable prettier/prettier */
import React from 'react';
import { useSelector } from 'react-redux';
import './index.css';
import LogIn from './login';
import ProfileInfo from './profile';

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
