import { Types } from "../actions/actionTypes"



const initialState =
{
    user: {
        username: "",
        email: ""
    },
    isLogged: false,
    loading: false,
    errorMessage: ""
}

//REDUCER
export const loggedReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case Types.LOG_IN:
            console.log("login request", action.payload);
            return {
                ...initialState,
                loading: true
            }
        case Types.LOG_IN_SUCCESS:
            console.log("login success", action.payload.user);
            return {
                ...initialState,
                loading: false,
                isLogged: true,
                user: action.payload.user,
                errorMessage: ""
            }
        case Types.LOG_IN_FAIL:
            console.log("login fail", action.payload.error);
            return {
                ...initialState,
                loading: false,
                isLogged: false,
                user: {},
                errorMessage: action.payload.error
            }
        case Types.LOG_OUT:
            console.log("login out");
            return {
                ...initialState,
                isLogged: false,
                user: null,
                errorMessage: ""
            }
        default:
            return { state }
        //throw new Error(`Unhandled action type: ${action.type}`);
    }
};