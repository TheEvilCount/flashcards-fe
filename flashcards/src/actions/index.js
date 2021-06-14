import { Types } from "./actionTypes"

export const increment = () =>
{
    return {
        type: "INCREMENT"
    };
};

export const decrement = () =>
{
    return {
        type: "DECREMENT"
    }
}


/* */
export const loginAction = (dispatch, loginPayload) =>
{
    dispatch({ type: Types.LOG_IN });


    //axios request
    let mockUsername = "TheEvilCount";

    if (loginPayload.email === "tt@ggg.com" && loginPayload.password === "123")
    {
        dispatch({
            type: Types.LOG_IN_SUCCESS,
            payload:
            {
                user: {
                    username: mockUsername,
                    email: loginPayload.email
                }
            }
        })
    }
    else//mock error
    {
        dispatch({
            type: Types.LOG_IN_FAIL,
            payload:
            {
                error: "errororrorororor"//error from request response
            }
        })
    }
}

export const logoutAction = (dispatch) =>
{
    dispatch({ type: Types.LOG_OUT });
}