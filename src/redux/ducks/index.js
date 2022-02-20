import { combineReducers } from 'redux';
import EventDuck from './eventDuck';
import UserDuck from './userDuck';
import PersonsDuck from './personsDuck';
import CompaniesDuck from './companiesDuck';

const rootReducer = combineReducers({
	UserDuck,
	EventDuck,
	PersonsDuck,
	CompaniesDuck,
});

export default rootReducer;
