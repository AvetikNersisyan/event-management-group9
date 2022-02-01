import {createStore} from "redux";
import rootReducer from "./ducks";

const Store = createStore(rootReducer);