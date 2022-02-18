import { createAction } from '../../../helper/redux-helper';
import { api } from '../../../api';

const SET_USERS = 'userDuck/SET_USER';
const ADD_USER = 'userDuck/ADD_USER';
const SET_ACTIVE_USER = 'userDuck/SET_ACTIVE_USER';
const SET_LOGGED_IN = 'userDuck/SET_LOGGED_IN';
const SET_PROFILE_PIC = 'userDuck/SET_PROFILE_PIC';
const SET_LIKED_EVENT = 'userDuck/SET_LIKED_EVENT';
const REMOVE_LIKED_EVENT = 'userDuck/REMOVE_LIKED_EVENT';
const ADD_GOING = 'eventDuck/ADD_GOING';

export const setUsers = createAction(SET_USERS);
export const addUser = createAction(ADD_USER);
export const setActiveUser = createAction(SET_ACTIVE_USER);
export const setLoggedIn = createAction(SET_LOGGED_IN);
export const setProfilePic = createAction(SET_PROFILE_PIC);
export const setLikedEvent = createAction(SET_LIKED_EVENT);
export const removeLike = createAction(REMOVE_LIKED_EVENT);
export const setGoing = createAction(ADD_GOING);

const initialState = {
	users: [
		{
			user_details: {},
			interestedEvents: [{}],
		},
	],
	activeUser: JSON.parse(sessionStorage.getItem('user')),
	loggedIn: false,
};

const UserDuck = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USERS:
			return { ...state, users: [...payload] };
		case ADD_USER:
			return { ...state, users: [...state.users, payload] };
		case SET_ACTIVE_USER:
			return { ...state, activeUser: payload };
		case SET_LOGGED_IN:
			return { ...state, loggedIn: payload };
		case SET_PROFILE_PIC:
			return { ...state, profilePic: payload };

		case ADD_GOING:
			const activeUser = {
				...state.activeUser,
				going: [...state.activeUser.going, payload.ev],
			};

			fetch(`${api}/users/${payload.userId}`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(activeUser),
			});

			return {
				...state,
				activeUser: { ...activeUser },
			};

		case REMOVE_LIKED_EVENT:
			console.log(payload, 'payload');
			console.log(payload.activeUser, 'users');
			const changedLikedEvents = payload.activeUser.interestedEvents.filter(
				({ id }) => id !== payload.eventID
			);

			const changedUser = {
				...state.activeUser,
				interestedEvents: changedLikedEvents,
			};

			console.log(changedUser, 'changed User');

			fetch(`${api}/users/${payload.activeUser.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(changedUser),
			}).catch((err) => console.warn(err));

			return {
				...state,
				activeUser: changedUser,
			};

		case SET_LIKED_EVENT:
			const changedUsers = state.users.map((user) => {
				if (user.id === payload.activeUser.id && user.type !== 'admin') {
					if (
						user.interestedEvents.every((event) => event.id !== payload.ev.id)
					) {
						user = {
							...user,
							interestedEvents: [...user.interestedEvents, payload.ev],
						};
						setActiveUser({ ...user });
						return user;
					} else console.log('already liked');
				}
				return user;
			});
			return { ...state, users: [...changedUsers] };
		default:
			return state;
	}
};

export default UserDuck;
