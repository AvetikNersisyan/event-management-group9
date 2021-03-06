import { createAction } from '../../../helper/redux-helper';
import { api } from '../../../api';

const SET_USERS = 'userDuck/SET_USER';
const ADD_USER = 'userDuck/ADD_USER';
const SET_ACTIVE_USER = 'userDuck/SET_ACTIVE_USER';
const SET_LOGGED_IN = 'userDuck/SET_LOGGED_IN';
const SET_PROFILE_PIC = 'userDuck/SET_PROFILE_PIC';
const SET_LIKED_EVENT = 'userDuck/SET_LIKED_EVENT';
const REMOVE_LIKED_EVENT = 'userDuck/REMOVE_LIKED_EVENT';
const ADD_GOING = 'userDuck/ADD_GOING';
const SET_RATED_EVENTS = 'userDuck/SET_RATED_EVENTS';
const SET_MESSAGE_READ = 'userDuck/SET_MESSAGE_READ';
const SET_MESSAGE_UNREAD = 'userDuck/SET_MESSAGE_UNREAD';

export const setUsers = createAction(SET_USERS);
export const addUser = createAction(ADD_USER);
export const setActiveUser = createAction(SET_ACTIVE_USER);
export const setLoggedIn = createAction(SET_LOGGED_IN);
export const setProfilePic = createAction(SET_PROFILE_PIC);
export const setLikedEvent = createAction(SET_LIKED_EVENT);
export const removeLike = createAction(REMOVE_LIKED_EVENT);
export const setGoing = createAction(ADD_GOING);
export const setRatedEvents = createAction(SET_RATED_EVENTS);
export const setMessageRead = createAction(SET_MESSAGE_READ);
export const setMessageUnread = createAction(SET_MESSAGE_UNREAD);

const initialState = {
	users: [
		{
			user_details: {},
			rated_events: [],
			interestedEvents: [{}],
		},
	],
	activeUser: JSON.parse(sessionStorage.getItem('user')),
	loggedIn: false,
};

const UserDuck = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_RATED_EVENTS:
			const users = state.users.map((item) => {
				if (item.id === payload.userId) {
					item.rated_events = [...item.rated_events, payload.eventId];
				}
				return item;
			});

			return { ...state, users: [...users] };
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
			return {
				...state,
				activeUser: payload,
			};

		case REMOVE_LIKED_EVENT:
			return {
				...state,
				activeUser: payload,
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
		case SET_MESSAGE_READ:
			const readIndex = state.activeUser.messages.findIndex(
				(item) => item.id === payload
			);
			state.activeUser.messages[readIndex].status = true;
			const changedReadActiveUser = state.activeUser;
			return { ...state, activeUser: changedReadActiveUser };
		case SET_MESSAGE_UNREAD:
			const unreadIndex = state.activeUser.messages.findIndex(
				(item) => item.id === payload
			);
			state.activeUser.messages[unreadIndex].status = false;
			const changedUnreadActiveUser = state.activeUser;
			return { ...state, activeUser: changedUnreadActiveUser };
		default:
			return state;
	}
};

export default UserDuck;
