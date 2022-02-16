import { createAction } from '../../../helper/redux-helper';

const SET_PERSONS = 'companiesDuck/SET_PERSONS';
const ADD_PERSON = 'eventDuck/ADD_PERSON';

export const setPersons = createAction(SET_PERSONS);
export const addPerson = createAction(ADD_PERSON);

const initialState = {
    persons: [{ persons_detail: {} }],
};

const PersonsDuck = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_PERSONS:
            return { ...state, persons: [...payload] };
        case ADD_PERSON:
            return { ...state, persons: [...state.persons, payload] };
        default:
            return state;
    }
};

export default PersonsDuck;
