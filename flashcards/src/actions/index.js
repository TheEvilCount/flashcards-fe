import { Types } from "./actionTypes";

import { history } from "../helpers/history";
import { pathConsts } from "../config/paths";
import axios from "axios";

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


    //TODO axios request
    setTimeout(() =>
    {
        let mockUsername = "TheEvilCount";
        let mockToken = "sdvnsjknvjsdnvjsv";

        if (loginPayload.email === "tt@ggg.com" && loginPayload.password === "123")
        {
            dispatch({
                type: Types.LOG_IN_SUCCESS,
                payload:
                {
                    user: {
                        username: mockUsername,
                        email: loginPayload.email
                    },
                    token: mockToken
                }
            })
        }
        else//mock error
        {
            dispatch({
                type: Types.LOG_IN_FAIL,
                payload:
                {
                    error: "Wrong email or password"//error from request response
                }
            })
        }
    }, 1000);
}

export const logoutAction = (dispatch) =>
{
    dispatch({ type: Types.LOG_OUT });
    //TODO add request
}


export const registerAction = (dispatch, registerPayload) =>
{
    dispatch({ type: Types.REGISTER_REQ });
    /*TODO
        axios.post("", {
            password: registerPayload.password,
            email: registerPayload.email,
            username: registerPayload.username
        })
            .then((response) =>
            {
                if (response.status === 200)
                {
                    dispatch({ type: Types.REGISTER_SUCCESS });
                    console.log(registerPayload);
                    history.push(pathConsts.login);
                }
                else
                {
                    console.log(response.data);
                    dispatch({ type: Types.REGISTER_FAIL, payload: { error: response.data } });
                }
            }).catch((reason) =>
            {
                console.log(reason);
                dispatch({ type: Types.REGISTER_FAIL, payload: { error: reason } });
            });
    */
    setTimeout(() => 
    {
        dispatch({ type: Types.REGISTER_SUCCESS });

        console.log(registerPayload);
        history.push(pathConsts.login);
    }, 1000)
}