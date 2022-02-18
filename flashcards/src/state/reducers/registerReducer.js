import actionTypes from "../actions/actionTypes";


const initialState =
{
    /* loading: false, */
    success: false,
    errorMessage: ""
}

//REDUCER
export const registerReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case actionTypes.REGISTER_REQ:
            console.log("register request"/* , action.payload */);
            return {
                ...state/* ,
                loading: true */
            }
        case actionTypes.REGISTER_SUCCESS:
            console.log("register success");
            return {
                ...state,
                /* loading: false,
                errorMessage: "", */
                success: true
            }
        case actionTypes.REGISTER_FAIL:
            console.log("register fail"/* , action.payload.error */);
            return {
                ...state,
                /*  loading: false,
                 errorMessage: action.payload.error, */
                success: false
            }
        default:
            return state
        //throw new Error(`Unhandled action type: ${action.type}`);
    }
};