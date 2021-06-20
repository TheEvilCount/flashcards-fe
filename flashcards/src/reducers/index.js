import { loggedReducer } from "./authReducer";
import { registerReducer } from "./registerReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers
    (
        {
            auth: loggedReducer,
            register: registerReducer
        }
    );

export default allReducers;