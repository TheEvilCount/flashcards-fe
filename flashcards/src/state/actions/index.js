import actionTypes from "./actionTypes";
import { pathConsts } from "../../config/paths";
import authAPI from "../../api/authAPI";
import { push } from 'connected-react-router'
import { regMsg } from "../../pages/VerifyPage";

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
                    dispatch({
                        type: actionTypes.LOG_IN_SUCCESS,
                        payload:
                        {
                            user: response.data.user/* ,
                            token: response.data?.token || null */
                        }
                    });
                    actions.setSubmitting(false);
                }
                else
                {
                    dispatch({ type: actionTypes.LOG_IN_FAIL/* , payload: { error: response.data.errorMessage } */ });
                    actions.setStatus({ message: response.data.errorMessage });
                    actions.setSubmitting(false);
                }
            })
            .catch((error) =>
            {
                dispatch({ type: actionTypes.LOG_IN_FAIL/* , payload: { error: error.message } */ });
                actions.setStatus({ message: "" + error });
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
                }
                else
                {
                    console.log(JSON.stringify(response));
                    alert("logout response not 200 :" + response);
                }
            })
            .catch((error) =>
            {
                console.log("logout error: " + JSON.stringify(error));
                alert("logout error: " + error?.message || "Unexpected error");
                dispatch({ type: actionTypes.LOG_OUT });
            })
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
                    dispatch({ type: actionTypes.REGISTER_SUCCESS });
                    actions.setSubmitting(false);
                    dispatch(push(`./${pathConsts.verify}?${regMsg.key}=${regMsg.val}`))
                }
                else
                {
                    //console.log(JSON.stringify(response));
                    //console.log("registration error: " + response.data.errorMessage);
                    dispatch({ type: actionTypes.REGISTER_FAIL });
                    actions.setStatus({ message: response.data });//TODO add better error messages
                    actions.setSubmitting(false);
                }
            }).catch((error) =>
            {
                dispatch({ type: actionTypes.REGISTER_FAIL/* , payload: { error: error } */ });
                actions.setStatus({ message: "" + error });//TODO add better error messages
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