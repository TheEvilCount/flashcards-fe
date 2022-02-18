/*import { actionTypes } from "../actions/actionTypes"


const initialState =
{
    loading: false,
    errorMessage: "",
    success: false
}

//REDUCER
export const profileReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case Types.CHANGE_PASS_REQ:
            console.log("change pass request", action.payload);
            return {
                ...initialState,
                loading: true
            }
        case Types.CHANGE_PASS_SUCCESS:
            console.log("change pass success");
            return {
                ...initialState,
                loading: false,
                errorMessage: "",
                success: true
            }
        case Types.CHANGE_PASS_FAIL:
            console.log("change pass fail", action.payload.error);
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
};*/