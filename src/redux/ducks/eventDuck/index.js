import { createAction } from '../../../helper/redux-helper';

const SET_EVENTS = 'eventDuck/SET_EVENTS';
const ADD_EVENT = 'eventDuck/ADD_EVENT';

export const setEvents = createAction(SET_EVENTS);
export const addEvent = createAction(ADD_EVENT);

const initialState = {
	events: [{ event_detail: {} }],
};

const EventDuck = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_EVENTS:
			return { ...state, events: [...payload] };
		case ADD_EVENT:
			console.log(payload, 'payload');
			return { ...state, events: [...state.events, payload] };
		default:
			return state;
	}
};

export default EventDuck;
