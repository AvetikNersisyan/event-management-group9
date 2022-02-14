import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, setActiveUser, setLoggedIn } from '../../../redux/ducks/userDuck';
import { api } from '../../../api'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const users = useSelector((state) => state.UserDuck.users)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [interests, setInterests] = useState([]);

    const regFirstnameElement = useRef(null);
    const regLastnameElement = useRef(null);
    const regEmailElement = useRef(null);
    const regPhoneElement = useRef(null);
    const regPassElement = useRef(null);
    const regPasConfElement = useRef(null);
    const interestElement = useRef(null);

    const addInterest = () => {
        let int = interestElement.current.value
        setInterests([...interests, int]);
        interestElement.current.value = '';
    };

    const removeInt = (e) => {
        let id = e.item
        const newInt = interests.filter((item) => item !== id)
        setInterests(newInt);
    }

    const handleRegistration = () => {
        if (regPassElement.current.value === regPasConfElement.current.value) {
            let newUser = {
                id: users.length,
                type: "user",
                firstname: regFirstnameElement.current.value,
                lastname: regLastnameElement.current.value,
                email: regEmailElement.current.value,
                password: regPassElement.current.value,
                phone: regPhoneElement.current.value,
                interests: interests,
                interestedEvents: [],
                allreadyGone: [],
                going: []
            };
            dispatch(addUser(newUser))
            fetch(`${api}/users`, {
                method: "POST",
                body: JSON.stringify(newUser), headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => {
                    dispatch(setActiveUser(json));
                    dispatch(setLoggedIn(true))
                })
                .then(navigate('/profile'))
        }
    };

    return (
        <div className='sign-in-page'>
            <div className='sign-in-conteiner'>
                <h1>Sign In</h1>
                <div className='sign-in-strocks'>
                    <input
                        ref={regFirstnameElement}
                        className='sign-in-inputs'
                        placeholder='Firstname'
                    />
                    <input
                        ref={regLastnameElement}
                        className='sign-in-inputs'
                        placeholder='Lastname'
                    />
                </div>
                <div className='sign-in-strocks'>
                    <input
                        ref={regPhoneElement}
                        className='sign-in-inputs'
                        placeholder='Phone'
                    />
                    <input
                        ref={regEmailElement}
                        className='sign-in-inputs'
                        placeholder='Email'
                    />
                </div>
                <div className='sign-in-strocks'>
                    <input
                        ref={regPassElement}
                        className='sign-in-inputs'
                        type='password'
                        placeholder='Password'
                    />
                    <input
                        ref={regPasConfElement}
                        className='sign-in-inputs'
                        type='password'
                        placeholder='Password confirmation'
                    />
                </div>
                <div className='sign-in-interests'>
                    <h2 className='interests'>Interestes</h2>
                    <div className='interests-items'>
                        {interests.map((item) => (
                            <span className='interests-item'>
                                <span>{item}</span>
                                <button className='button' onClick={() => removeInt({ item })}>Remove</button>
                            </span>
                        ))}
                    </div>
                    <div className='interest-stroke'>
                        <input className='sign-in-inputs' type="search" ref={interestElement} placeholder='type your interests' />
                        <button className='button' onClick={addInterest}>Add</button>
                    </div>
                </div>
                <button className='button' onClick={handleRegistration}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignUp;
