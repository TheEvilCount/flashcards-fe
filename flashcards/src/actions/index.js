import { Types } from "./actionTypes";

import { history } from "../helpers/history";
import { pathConsts } from "../config/paths";
import axios from "axios";

/*
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
}*/


/* */
export const loginAction = (dispatch, loginPayload) =>
{
    dispatch({ type: Types.LOG_IN });


    //TODO url + make config file with api urls
    /*
    axios.post("", {
        password: loginPayload.password,
        email: loginPayload.email
    })
        .then((response) =>
        {
            if (response.status === 200)
            {
                dispatch({
                    type: Types.LOG_IN_SUCCESS,
                    payload:
                    {
                        user: response.data.user,
                        token: response.data.token
                    }
                });
                console.log("login success" + response.data.user);
                //TODO set user session??
            }
            else
            {
                console.log(response.data);
                dispatch({ type: Types.LOG_IN_FAIL, payload: { error: response.data } });
            }
        })
        .catch((error) =>
        {
            console.log(error);
            dispatch({ type: Types.LOG_IN_FAIL, payload: { error: error.message } });
        });*/

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

export const loginFailAction = (dispatch, errorMessage) =>
{
    dispatch({ type: Types.LOG_IN_FAIL, payload: { error: errorMessage } });
}

export const logoutAction = (dispatch, logoutPayload) =>
{
    dispatch({ type: Types.LOG_OUT });//dev


    //TODO request /logout
    /*
    axios.get("", {
        /*headers: {
            Authorization: `token ${logoutPayload.authToken}`
        },*///??????????
    /*
    withCredentials: true
})
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
    })*/
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
            }).catch((error) =>
            {
                console.log(error);
                dispatch({ type: Types.REGISTER_FAIL, payload: { error: error.message } });
            });
    */
    setTimeout(() => 
    {
        dispatch({ type: Types.REGISTER_SUCCESS });

        console.log(registerPayload);
        history.push(pathConsts.login);
    }, 1000)
}

export const registerFailAction = (dispatch, errorMessage) =>
{
    dispatch({ type: Types.REGISTER_FAIL, payload: { error: errorMessage } });
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