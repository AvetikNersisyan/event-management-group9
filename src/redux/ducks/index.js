import {combineReducers} from "redux";
import EventDuck from "./eventDuck";
import {UserDuck} from "../userDuck";

const rootReducer = combineReducers({
    EventDuck, UserDuck
});

export default rootReducer;