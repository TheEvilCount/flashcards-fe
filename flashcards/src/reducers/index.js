import counterReducer from "./counter";
import { loggedReducer } from "./authReducer";
import { registerReducer } from "./registerReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers
    (
        {
            counter: counterReducer,
            auth: loggedReducer,
            register: registerReducer
        }
    );

export default allReducers;