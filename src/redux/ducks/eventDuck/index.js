import { createAction } from '../../../helper/redux-helper';

const SET_EVENTS = 'eventDuck/SET_EVENTS';
const ADD_EVENT = 'eventDuck/ADD_EVENT';
const DELETE_EVENT = 'eventDuck/DELETE_EVENT';
const DECREASE_SEATS = 'eventDuck/DECREASE_SEATS';
const ADD_COMMENT = 'eventDuck/ADD_COMMENT';

export const setEvents = createAction(SET_EVENTS);
export const addEvent = createAction(ADD_EVENT);
export const deleteEvent = createAction(DELETE_EVENT);
export const decreaseSeats = createAction(DECREASE_SEATS);
export const addComment = createAction(ADD_COMMENT);

const initialState = {
	events: [{ event_detail: {} }],
};

const EventDuck = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_EVENTS:
			return { ...state, events: [...payload] };
		case DELETE_EVENT:
			const filteredEvents = state.events.filter(({ id }) => id !== payload);
			return { ...state, events: filteredEvents };
		case ADD_EVENT:
			let index = state.events.findIndex(({ id }) => id === payload.id);
			state.events.splice(index, 1, payload);
			return { ...state, events: [...state.events] };

		case DECREASE_SEATS:
			const seatFilterEvent = state.events.map((event) =>
				event.id === payload.eventId ? payload : event
			);

			return { ...state, events: seatFilterEvent };
		case ADD_COMMENT:
			let newEvent = state.events.map((item) => {
				if (item.id === payload.id) {
					item.comments.push(payload.newComment);
					return item;
				} else {
					return item;
				}
			});
			return { ...state, events: newEvent };
		default:
			return state;
	}
};

export default EventDuck;
