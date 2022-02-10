import { Types } from "./actionTypes";

import { history } from "../helpers/history";
import { pathConsts } from "../config/paths";
import authAPI from "../api/auth/authAPI";

export const loginAction = (dispatch, payload, actions) =>
{
    dispatch({ type: Types.LOG_IN });




    authAPI.login(payload.email, payload.password)
        .then((response) =>
        {
            if (response.status === 200 && response.data.success !== false)
            {
                dispatch({
                    type: Types.LOG_IN_SUCCESS,
                    payload:
                    {
                        user: response.data.user,
                        //token: response.data.token
                    }
                });
                //TODO set user session??

                actions.setSubmitting(false);
            }
            else
            {
                dispatch({ type: Types.LOG_IN_FAIL/* , payload: { error: response.data.errorMessage } */ });
                actions.setStatus({ message: response.data.errorMessage });
                actions.setSubmitting(false);
            }
        })
        .catch((error) =>
        {
            dispatch({ type: Types.LOG_IN_FAIL/* , payload: { error: error.message } */ });
            actions.setStatus({ message: "" + error });
            actions.setSubmitting(false);
        });
}

/* export const loginFailAction = (dispatch, errorMessage) =>
{
    dispatch({ type: Types.LOG_IN_FAIL, payload: { error: errorMessage } });
} */

export const logoutAction = (dispatch) =>
{
    authAPI.logout()
        .then((response) =>
        {
            if (response.status === 200)
            {
                dispatch({ type: Types.LOG_OUT });
            }
            else
            {
                console.log(response);
                alert(response);
            }
        })
        .catch((error) =>
        {
            console.log(error);
            alert(error.message);
        })
}


export const registerAction = (dispatch, payload, actions) =>
{
    dispatch({ type: Types.REGISTER_REQ });

    authAPI.register(payload.username, payload.email, payload.password)
        .then((response) =>
        {
            if (response.status === 201)//201 created
            {
                dispatch({ type: Types.REGISTER_SUCCESS });
                console.log(payload);
                history.push(pathConsts.login + "?msg=Register success");
            }
            else
            {
                //console.log(JSON.stringify(response));
                //console.log("registration error: " + response.data.errorMessage);
                dispatch({ type: Types.REGISTER_FAIL });
                //console.warn(response.data.errorMessage);
                actions.setStatus({ message: response.data });//TODO add better error messages
                actions.setSubmitting(false);
            }
        }).catch((error) =>
        {
            dispatch({ type: Types.REGISTER_FAIL/* , payload: { error: error } */ });
            actions.setStatus({ message: "" + error });//TODO add better error messages
            actions.setSubmitting(false);
        });
    /*
    setTimeout(() => 
    {
        dispatch({ type: Types.REGISTER_SUCCESS });

        console.log(registerPayload);
        history.push(pathConsts.login);
    }, 1000)*/
}

/* export const registerFailAction = (dispatch, errorMessage) =>
{
    dispatch({ type: Types.REGISTER_FAIL, payload: { error: errorMessage } });
} */

/*
export const changePassAction = (dispatch, changePassPayload) =>
{
    console.log(changePassPayload);
    dispatch({ type: Types.CHANGE_PASS_REQ });

    const user = changePassPayload.user;
    const pass = changePassPayload.password;
    const newPass = changePassPayload.newPassword;


    //dispatch({ type: Types.CHANGE_PASS_FAIL });

    dispatch({ type: Types.CHANGE_PASS_SUCCESS });
}*/