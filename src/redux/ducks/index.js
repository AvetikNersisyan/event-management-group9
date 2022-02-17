import { combineReducers } from "redux";
import EventDuck from "./eventDuck";
import UserDuck from "./userDuck";
import PersonsDuck from "./personsDuck";
import CompaniesDuck from "./companiesDuck";

const rootReducer = combineReducers({
    EventDuck, UserDuck, PersonsDuck, CompaniesDuck
});

export default rootReducer;