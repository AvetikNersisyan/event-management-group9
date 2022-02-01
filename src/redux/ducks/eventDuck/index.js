const FETCH = "eventDuck/FETCH";


const initialState = {
    events: []
};

const EventDuck = (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH:
            return {...state, events: payload};
    }
};

export default EventDuck;