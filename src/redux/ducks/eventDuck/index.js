import {createAction} from "../../../helper/redux-helper";


const FETCH = "eventDuck/FETCH";


export const fetchData = createAction(FETCH);


const initialState = {
    users: {}
};


const EventDuck = (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH:
            return {...state, users: payload};
        default:
            return state;
    }
};

export default EventDuck;