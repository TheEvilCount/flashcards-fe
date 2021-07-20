import { Types } from "../actions/actionTypes"

const initialState =
{
    user: {
        id: null,
        username: "",
        email: ""
    },
    isLogged: false,
    authToken: null,
    loading: false,
    errorMessage: ""
}

//REDUCER
export const loggedReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case Types.LOG_IN:
            console.log("login request");
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
                authToken: action.payload.token,
                errorMessage: ""
            }
        case Types.LOG_IN_FAIL:
            console.log("login fail", action.payload.error);
            return {
                ...initialState,
                loading: false,
                isLogged: false,
                user: {},
                authToken: null,
                errorMessage: action.payload.error
            }
        case Types.LOG_OUT:
            console.log("login out");
            return {
                ...initialState,
                isLogged: false,
                user: null,
                authToken: null,
                errorMessage: ""
            }
        default:
            return { state }
        //throw new Error(`Unhandled action type: ${action.type}`);
    }
};