import actionTypes from "./actionTypes";
import { pathConsts } from "../../config/paths";
import authAPI from "../../api/authAPI";
import { push } from 'connected-react-router'
import { regMsg } from "../../pages/VerifyPage";
import usersAPI from "api/usersAPI";
import errorParse from "helpers/errorParse";
import { toast } from "react-toastify";

export const loginAction = (payload, actions) =>
{
    return (dispatch) =>
    {
        dispatch({ type: actionTypes.LOG_IN });

        authAPI.login(payload.email, payload.password, payload.remember)
            .then((response) =>
            {
                if (response.status === 200 && response.data.success !== false)
                {
                    actions.setSubmitting(false);
                    dispatch({
                        type: actionTypes.LOG_IN_SUCCESS,
                        payload:
                        {
                            user: response.data.user/* ,
                            token: response.data?.token || null */
                        }
                    });
                }
                else
                {
                    dispatch({ type: actionTypes.LOG_IN_FAIL });
                    //actions.setStatus({ message: response.data.errorMessage });
                    actions.setStatus({ message: errorParse(response.data) });
                    actions.setSubmitting(false);
                }
            })
            .catch((error) =>
            {
                dispatch({ type: actionTypes.LOG_IN_FAIL/* , payload: { error: error.message } */ });
                actions.setStatus({ message: errorParse(error) });
                actions.setSubmitting(false);
            });
    }
}

export const logoutAction = () =>
{
    return (dispatch) =>
    {
        authAPI.logout()
            .then((response) =>
            {
                if (response.status === 200)
                {
                    dispatch({ type: actionTypes.LOG_OUT });
                    toast.success("Logout successfull");
                }
                else
                {
                    console.log(JSON.stringify(response));
                    dispatch({ type: actionTypes.LOG_OUT });
                    toast.error("Cannot reach server during logout");
                }
            })
            .catch((error) =>
            {
                console.log("logout error: " + JSON.stringify(error));
                toast.error("Logout error: " + error?.message || "Unexpected error");
                dispatch({ type: actionTypes.LOG_OUT });
            })
    }
}

export const preferencesChangeAction = (payload) =>
{
    return (dispatch) =>
    {
        usersAPI.updatePrefs(payload.preferences)
            .then((response) =>
            {
                if (response.status === 200 && response.data.success !== false)
                {
                    dispatch({
                        type: actionTypes.PREFERENCES_CHANGE,
                        payload:
                        {
                            preferences: payload.preferences,
                            user: response.data
                        }
                    });
                    toast.success("Preferencies changed!")
                }
                else
                {
                    toast.error("Preferencies change error!");
                    console.error("update prefs then error");
                }
            })
            .catch((error) =>
            {
                toast.error("Preferencies change error: " + error);
                console.error("update prefs catch error" + error);
            });
    }
}

export const registerAction = (email, username, password, actions) =>
{
    return (dispatch) =>
    {
        dispatch({ type: actionTypes.REGISTER_REQ });

        authAPI.register(username, email, password)
            .then((response) =>
            {
                if (response.status === 201)//201 created
                {
                    console.log("register 201 created")
                    actions.setSubmitting(false);
                    dispatch({ type: actionTypes.REGISTER_SUCCESS });
                    dispatch(push(`${pathConsts.verify}?${regMsg.key}=${regMsg.val}&email=${email}`))
                }
                else
                {
                    dispatch({ type: actionTypes.REGISTER_FAIL });
                    console.log(response)
                    actions.setStatus({ message: errorParse(response.data) });
                    toast.error(response.data || "Unexpected Error");
                    actions.setSubmitting(false);
                }
            }).catch((error) =>
            {
                console.log(JSON.stringify(error))
                dispatch({ type: actionTypes.REGISTER_FAIL });
                actions.setStatus({ message: errorParse(error.data || error) });
                toast.error(error.data || error);
                actions.setSubmitting(false);
            });
    }
}

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