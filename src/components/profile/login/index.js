import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';

const LogIn = ({ users, loggedIn, setLoggedIn, setActiveUser }) => {
    const emailElement = useRef(null);
    const passwordElement = useRef(null);

    const handleLogIn = () => {
        let index = users.findIndex((i) => i.email === emailElement.current.value);
        if (index < 0) {
            alert('User not found');
        } else {
            if (users[index].password === passwordElement.current.value) {
                setActiveUser(users[index]);
                setLoggedIn(!loggedIn);
            } else {
                alert('incorrect password');
            }
        }
    };

    return (
        <div className='logIn'>
            <div>
                <input className='logInInputs' placeholder='Email' ref={emailElement} />
            </div>
            <div>
                <input
                    type='password'
                    className='logInInputs'
                    placeholder='Password'
                    ref={passwordElement}
                />
                <p>Forget your Password?</p>
            </div>
            <div>
                <button className='logBtn' onClick={handleLogIn}>
                    Log in
                </button>
                <br />
            </div>
            <p className='or'>Or</p>
            <div className='continue'>
                <button className='logBtn'>Continue with Facebook</button>
                <button className='logBtn'>Continue with Google</button>
            </div>
            <p>
                By continuing you agree to Our's{' '}
                <a className='terms'>Terms of Service</a>,{' '}
                <a className='terms'>Privacy Police</a>
            </p>
            <p>
                You don't have an account yet, then
                <NavLink to={'signup'} className='logBtn'>
                    Sign up
                </NavLink>
            </p>
        </div>
    );
};

export default LogIn;
