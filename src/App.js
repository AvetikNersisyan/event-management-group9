import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Profile from './components/profile';
import Events from './components/events';
import Index from './components/header';
import Categories from './components/categories';

import { useEffect } from 'react';
import SignUp from './components/profile/signUp';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from './redux/ducks/userDuck';
import SingleEvent from './components/events/singleEvent';
import { setEvents } from './redux/ducks/eventDuck';
import { api } from './api';
import Error404 from './components/error404';

function App() {
	const dispatch = useDispatch();

	// fake info, to be deleted later
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users/1')
			.then((res) => res.json())
			.then((res) => dispatch(setLoggedInUser(res)));

		fetch(`${api}/events`)
			.then((res) => res.json())
			.then((res) => {
				console.log(res, 'res');
				dispatch(setEvents(res));
			});
	}, []);

	return (
		<div className='App'>
			<Index />

			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path={'/profile'} element={<Profile />} />
				<Route path={'/categories'} element={<Categories />} />
				<Route path={'profile/signup'} element={<SignUp />} />
				<Route path={'/profile/'} element={<Profile />} />
				<Route path={'/events/:eventId'} element={<SingleEvent />} />
				<Route path={'/events'} exact={true} element={<Events />} />
				<Route path={'*'} element={<Error404 />} />
			</Routes>
		</div>
	);
}

export default App;
