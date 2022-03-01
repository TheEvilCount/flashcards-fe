import actionTypes from "../actions/actionTypes"

const initialState =
{
    user: {
        id: null,
        username: "",
        email: "",
        preferences: ""
    },
    parsedPrefs: { flipLeft: true, darkmode: true },
    isLogged: false,
    authToken: null,
    //loading: false,
    //errorMessage: ""
}

//REDUCER
export const loggedReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case actionTypes.LOG_IN:
            console.log("login request");
            return {
                ...state/* ,
                loading: true */
            }
        case actionTypes.LOG_IN_SUCCESS:
            console.log("login success", action.payload.user);
            return {
                ...state,
                //loading: false,
                isLogged: true,
                user: action.payload.user,
                parsedPrefs: action.payload.user.preferences ? JSON.parse(action.payload.user.preferences) : initialState.parsedPrefs
                /* ,
                authToken: action.payload.token, */
                //errorMessage: ""
            }
        case actionTypes.LOG_IN_FAIL:
            console.log("login fail"/* , action.payload.error */);
            return {
                ...state,
                //loading: false,
                isLogged: false,
                user: {},
                authToken: null,
                //errorMessage: action.payload.error
            }
        case actionTypes.LOG_OUT:
            console.log("login out");
            return {
                ...state,
                isLogged: false,
                user: null,
                authToken: null,
                parsedPrefs: null
                //errorMessage: ""
            }
        case actionTypes.PREFERENCES_CHANGE:
            return {
                ...state,
                parsedPrefs: action.payload.preferences,
                user: action.payload.user
            }
        default:
            return state
        //throw new Error(`Unhandled action type: ${action.type}`);
    }
};