import { createAction } from '../../../helper/redux-helper';

const SET_USERS = 'userDuck/SET_USER';
const ADD_USER = 'userDuck/ADD_USER';
const SET_ACTIVE_USER = 'userDuck/SET_ACTIVE_USER';
const SET_LOGGED_IN = 'userDuck/SET_LOGGED_IN';
const SET_PROFILE_PIC = 'userDuck/SET_PROFILE_PIC';
const SET_IS_USER_LOGGED_IN = 'userDuck/SET_IS_USER_LOGGED_IN';
const SET_IS_ADMIN_LOGGED_IN = 'userDuck/SET_IS_ADMIN_LOGGED_IN';
const SET_LIKED_EVENT = 'userDuck/SET_LIKED_EVENT';

export const setUsers = createAction(SET_USERS);
export const addUser = createAction(ADD_USER);
export const setActiveUser = createAction(SET_ACTIVE_USER);
export const setLoggedIn = createAction(SET_LOGGED_IN);
export const setProfilePic = createAction(SET_PROFILE_PIC);
export const setLikedEvent = createAction(SET_LIKED_EVENT);

const initialState = {
	users: [{ user_details: {}, interestedEvents: [] }],
	activeUser: null,
	loggedIn: false,
};

export const UserDuck = (state = initialState, { type, payload }) => {
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
		case SET_LIKED_EVENT:
			console.log(payload);
			state.users.forEach((user) => {
				if (user.id === payload && user.type !== 'admin') {
					if (user.interestedEvents.every((eventId) => eventId !== payload)) {
						user.interestedEvents = [...user.interestedEvents, payload];
					} else console.log('already liked');
					console.log(user.interestedEvents, 'single interest');
				}
			});

			// console.log(state.users, 'users');
			return { ...state, users: [...state.users] };
		default:
			return state;
	}
};
