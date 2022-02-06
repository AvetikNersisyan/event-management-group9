import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Profile from './components/profile';
import Events from './components/events';
import Header from './components/header/header';
import Categories from './components/categories';
import { useDispatch } from 'react-redux';
import SignUp from './components/profile/signUp';
import React from 'react';
import { useEffect } from 'react';
import { setLoggedInUser } from './redux/ducks/userDuck';
import SingleEvent from './components/events/singleEvent';
import { setEvents } from './redux/ducks/eventDuck';
import { api } from './api';

function App() {
	const dispatch = useDispatch();

	console.log(api);

	// fake info, to be deleted later
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users/1')
			.then((res) => res.json())
			.then((res) => dispatch(setLoggedInUser(res)));

		fetch(`${api}/events/`)
			.then((res) => res.json())
			.then((res) => dispatch(setEvents(res)))
			.catch((err) => console.error(err));
	});

	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path={'/profile'} element={<Profile />} />
				<Route path={'/categories'} element={<Categories />} />

				<Route path={'profile/signup'} element={<SignUp />} />
				<Route path={'/profile//*'} element={<Profile />} />

				<Route path={'/events/:eventId'} element={<SingleEvent />} />
				<Route path={'/events'} exact={true} element={<Events />} />
				<Route path={'*'} element={<div> error 404</div>} />
			</Routes>
		</div>
	);
}

export default App;
