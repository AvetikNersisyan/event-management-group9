import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../../redux/ducks/userDuck';
import { api } from '../../../api'

const SignUp = () => {
    const users = useSelector((state) => state.UserDuck.users)

    const dispatch = useDispatch()

    const [interests, setInterests] = useState([]);

    const regFirstnameElement = useRef(null);
    const regLastnameElement = useRef(null);
    const regEmailElement = useRef(null);
    const regPhoneElement = useRef(null);
    const regPassElement = useRef(null);
    const regPasConfElement = useRef(null);
    const interestElement = useRef(null);

    const addInterest = () => {
        setInterests((prev) => [...prev, interestElement.current.value]);
        interestElement.current.value = '';
    };

    const handleRegistration = () => {
        if (regPassElement.current.value === regPasConfElement.current.value) {
            let newUser = {
                id: users.length,
                firstname: regFirstnameElement.current.value,
                lastname: regLastnameElement.current.value,
                email: regEmailElement.current.value,
                password: regPassElement.current.value,
                phone: regPhoneElement.current.value,
            };
            dispatch(addUser(newUser))
            fetch(`${api}/users`, {
                method: "POST",
                body: JSON.stringify(newUser), headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => console.log(json));
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
            {/* <div>
                <p className='interests'>Interestes</p>
                <div className='interestsItems'>
                    {interests.map((item) => (
                        <InterestComp key={item.index} interest={item.interest} />
                    ))}
                </div>
                <input ref={interestElement} placeholder='type your interests' />
                <button onClick={addInterest}>Add</button>
            </div> */}
            <div>
                <button className='logBtn' onClick={handleRegistration}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignUp;
