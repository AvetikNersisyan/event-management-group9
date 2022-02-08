import { createAction } from '../../../helper/redux-helper';

const SET_LOGGED_IN_USER = 'userDuck/SET_LOGGED_IN_USER';

export const setLoggedInUser = createAction(SET_LOGGED_IN_USER);

const initialState = {
	loggedInUser: {},
};

export const UserDuck = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_LOGGED_IN_USER:
			return { ...state, loggedInUser: payload };
		default:
			return state;
	}
};
