import counterReducer from "./counter";
import loggedReducer from "./authReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers
    (
        {
            counter: counterReducer,
            auth: loggedReducer
        }
    );

export default allReducers;