import React, { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './components/home';
import Profile from './components/profile';
import Events from './components/events';
import Index from './components/header';
import Categories from './components/categories';
import Feedback from './components/feedback'
import SignUp from './components/profile/signUp';
import SingleEvent from './components/events/singleEvent';
import Error404 from './components/error404';
import NewEvent from './components/events/newEvent';
import Footer from './components/footer';
import About from './components/about';

import { setEvents } from './redux/ducks/eventDuck';
import { api } from './api';
import { setPersons } from './redux/ducks/personsDuck';
import { setFeedbacks } from './redux/ducks/feedbackDuck';

import './App.css';

function App() {
	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.UserDuck.activeUser)

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
		fetch(`${api}/feedbacks`)
			.then((res) => res.json())
			.then(res => {
				dispatch(setFeedbacks(res))
			})
	}, []);

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
				<Route path={'/about'} element={<About />} />
			</Routes>

			{!isAdminLogged && <Feedback activeUser={activeUser} />}

			<Footer />
		</div>
	);
}

export default App;
