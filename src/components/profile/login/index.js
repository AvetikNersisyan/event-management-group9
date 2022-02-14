import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUser, setLoggedIn } from '../../../redux/ducks/userDuck';
import { NavLink } from 'react-router-dom';
import { api } from '../../../api';

const LogIn = () => {
	const dispatch = useDispatch();

	const emailElement = useRef(null);
	const passwordElement = useRef(null);

	const handleLogIn = () => {
		fetch(`${api}/users`)
			.then((res) => res.json())
			.then((res) => {
				let index = res.findIndex((i) => i.email === emailElement.current.value);
				if (index < 0) {
					alert('User not found');
				} else {
					if (res[index].password === passwordElement.current.value) {
						dispatch(setActiveUser(res[index]));
						dispatch(setLoggedIn(true));
					} else {
						alert('incorrect password');
					}
				};
			});

	}


	return (
		<div className='profile-log-in'>
			<div className='log-in-conteiner'>
				<input className='log-in-inputs' placeholder='Email' ref={emailElement} />
				<input
					type='password'
					className='log-in-inputs'
					placeholder='Password'
					ref={passwordElement}
				/>
				<p>Forget your Password?</p>
				<div>
					<button className='button' onClick={handleLogIn}>
						Log in
					</button>
					<br />
				</div>
				<p className='or'>Or</p>
				<div className='continue'>
					<button className='button'>Continue with Facebook</button>
					<button className='button'>Continue with Google</button>
				</div>
				<p>
					By continuing you agree to Our's{' '}
					<a className='terms'>Terms of Service</a>,{' '}
					<a className='terms'>Privacy Police</a>
				</p>
				<p>
					You don't have an account yet, then
					<NavLink style={{ fontSize: '20px', fontWeight: 'bolder' }} to={'signup'} className='sign-in-btn'>
						Sign in
					</NavLink>
				</p>
			</div>
		</div >
	);
};

export default LogIn;
