import { Types } from "../actions/actionTypes"


const initialState =
{
    loading: false,
    success: false,
    errorMessage: ""
}

//REDUCER
export const registerReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case Types.REGISTER_REQ:
            console.log("register request", action.payload);
            return {
                ...initialState,
                loading: true
            }
        case Types.REGISTER_SUCCESS:
            console.log("register success");
            return {
                ...initialState,
                loading: false,
                errorMessage: "",
                success: true
            }
        case Types.REGISTER_FAIL:
            console.log("register fail", action.payload.error);
            return {
                ...initialState,
                loading: false,
                errorMessage: action.payload.error,
                success: false
            }
        default:
            return { state }
        //throw new Error(`Unhandled action type: ${action.type}`);
    }
};