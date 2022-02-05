import {createAction} from "../../../helper/redux-helper";

const SET_EVENTS = "eventDuck/SET_EVENTS";

export const setEvents = createAction(SET_EVENTS);

const initialState = {
    events: [{event_detail: {}}]
};


const EventDuck = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_EVENTS:
            return {...state, events: payload};
        default:
            return state;
    }
};

export default EventDuck;