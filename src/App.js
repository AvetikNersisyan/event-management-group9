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
import { useDispatch, useSelector } from 'react-redux';
import SingleEvent from './components/events/singleEvent';
import { setEvents } from './redux/ducks/eventDuck';
import { api } from './api';
import Error404 from './components/error404';
import NewEvent from './components/events/newEvent';
import Footer from './components/footer';

import { setPersons } from './redux/ducks/personsDuck';
import { setActiveUser } from './redux/ducks/userDuck';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		fetch(`${api}/events`)
			.then((res) => res.json())
			.then((res) => {
				dispatch(setEvents(res));
			});

		fetch(`${api}/persons`)
			.then((res) => res.json())
			.then((res) => {
				dispatch(setPersons(res));
			});
	}, []);

	const activeUser = useSelector(({ UserDuck }) => UserDuck.activeUser); //TODO: get active user to show delete button

	const isAdminLogged = activeUser && activeUser.type === 'admin';

	return (
		<div className='App'>
			<Index />
			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path={'/categories'} element={<Categories />} />
				<Route path={'profile/signup'} element={<SignUp />} />
				<Route path={'/profile/'} element={<Profile />} />
				<Route
					path={'/events/:eventId'}
					exact={true}
					element={<SingleEvent />}
				/>
				<Route path={'/events'} element={<Events />} />
				{isAdminLogged && <Route path={'/new-event'} element={<NewEvent />} />}
				<Route path={'*'} element={<Error404 />} />
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
