import React, {useState} from 'react';
import './index.css';
import LogIn from './login';
import ProfileInfo from './profile';

const users = [
    {
        "id": 0,
        "firstname": "Hayk",
        "lastname": "Keshishyan",
        "email": "Hayk@gmail.com",
        "password": "000",
        "phone": "000-11-22-33"
    },
    {
        "id": 1,
        "firstname": "Lilit",
        "lastname": "Madoyan",
        "email": "Lilit@gmail.com",
        "password": "111",
        "phone": "000-11-22-33"
    },
    {
        "id": 2,
        "firstname": "Avetik",
        "lastname": "Nersisyan",
        "email": "Avetik@gmail.com",
        "password": "222",
        "phone": "000-11-22-33"
    },
    {
        "id": 3,
        "firstname": "Arsen",
        "lastname": "Aghasaryan",
        "email": "Arsen@gmail.com",
        "password": "333",
        "phone": "000-11-22-33"
    },
    {
        "id": 4,
        "firstname": "Tatev",
        "lastname": "Harutyunyan",
        "email": "Tatev@gmail.com",
        "password": "444",
        "phone": "000-11-22-33"
    }
];

const Profile = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [activeUser, setActiveUser] = useState(null);


    return (
        <div className="profilePage">
            {
                !loggedIn ?
                    <LogIn
                        users={users}
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn}
                        setActiveUser={setActiveUser}
                    />
                    :
                    <ProfileInfo
                        activeUser={activeUser}
                    />
            }


        </div>

    );
};

export default Profile;