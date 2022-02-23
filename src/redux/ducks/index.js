import { combineReducers } from 'redux';
import EventDuck from './eventDuck';
import UserDuck from './userDuck';
import PersonsDuck from './personsDuck';
import CompaniesDuck from './companiesDuck';
import FeedbackDuck from './feedbackDuck'

const rootReducer = combineReducers({
	UserDuck,
	EventDuck,
	PersonsDuck,
	CompaniesDuck,
	FeedbackDuck,
});

export default rootReducer;
