import { createAction } from '../../../helper/redux-helper';
import { api } from '../../../api';

const SET_EVENTS = 'eventDuck/SET_EVENTS';
const ADD_EVENT = 'eventDuck/ADD_EVENT';
const DELETE_EVENT = 'eventDuck/DELETE_EVENT';
const DECREASE_SEATS = 'eventDuck/DECREASE_SEATS';

export const setEvents = createAction(SET_EVENTS);
export const addEvent = createAction(ADD_EVENT);
export const deleteEvent = createAction(DELETE_EVENT);
export const decreaseSeats = createAction(DECREASE_SEATS);

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
			return { ...state, events: [...state.events, payload] };

		case DECREASE_SEATS:
			const seatFilterEvent = state.events.filter(
				({ id }) => id === payload.eventId
			);

			seatFilterEvent[0].event_details.available_seats -= payload.seats;

			fetch(`${api}/events/${payload.eventId}`, {
				headers: {
					'Content-type': 'application/json',
				},
				method: 'PUT',
				body: JSON.stringify(seatFilterEvent[0]),
			}).catch((err) => console.log(err));

			return { ...state, events: [...state.events] };
		default:
			return state;
	}
};

export default EventDuck;
