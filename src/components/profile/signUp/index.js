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
        <div className='signIn'>
            <div>
                <input
                    ref={regFirstnameElement}
                    className='signInInputs'
                    placeholder='Firstname'
                />
                <input
                    ref={regLastnameElement}
                    className='signInInputs'
                    placeholder='Lastname'
                />
            </div>
            <div>
                <input
                    ref={regEmailElement}
                    className='signInInputs'
                    placeholder='Email'
                />
                <input
                    ref={regPhoneElement}
                    className='signInInputs'
                    placeholder='Phone'
                />
            </div>
            <div>
                <input
                    ref={regPassElement}
                    className='signInInputs'
                    type='password'
                    placeholder='Password'
                />
                <input
                    ref={regPasConfElement}
                    className='signInInputs'
                    type='password'
                    placeholder='Password confirmation'
                />
            </div>
            <div>
                <p className='interests'>Interestes</p>
                <div className='interestsItems'>
                    {interests.map((item) => (
                        <span className='interestsItem'>
                            <span>{item}</span>
                            <button onClick={() => removeInt({ item })}>Remove</button>
                        </span>
                    ))}
                </div>
                <input type="search" ref={interestElement} placeholder='type your interests' />
                <button onClick={addInterest}>Add</button>
            </div>
            <div>
                <button className='logBtn' onClick={handleRegistration}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignUp;
