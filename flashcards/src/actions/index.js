import { Types } from "./actionTypes";

import { history } from "../helpers/history";
import { API_SERVER_URL, pathConsts } from "../config/paths";
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
    var data = new FormData();
    /*fdata.append("email", loginPayload.password);
    fdata.append("password", loginPayload.email);*/
    data.append("email", loginPayload.email);
    data.append("password", loginPayload.password);
    // data.append("remember", loginPayload.remember);

    axios.post(API_SERVER_URL + "/login",
        data,
        {
            headers:
            {
                "Accept": "application/json",
                'Content-Type': 'multipart/form-data'
            }
        }
    )
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
            }
            else
            {
                dispatch({ type: Types.LOG_IN_FAIL, payload: { error: response.data.errorMessage } });
            }
        })
        .catch((error) =>
        {
            dispatch({ type: Types.LOG_IN_FAIL, payload: { error: error.message } });
        });
    /*
        setTimeout(() =>
        {
            let mockUsername = "TheEvilCount";
            let mockToken = "sdvnsjknvjsdnvjsv";
    
            if (loginPayload.email === "tt@ggg.com" && loginPayload.password === "123456")
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
        }, 1000);*/
}

export const loginFailAction = (dispatch, errorMessage) =>
{
    dispatch({ type: Types.LOG_IN_FAIL, payload: { error: errorMessage } });
}

export const logoutAction = (dispatch) =>
{
    //dispatch({ type: Types.LOG_OUT });//dev


    //TODO request /logout

    axios.get(API_SERVER_URL + "/logout", {
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
        })
}


export const registerAction = (dispatch, registerPayload) =>
{
    dispatch({ type: Types.REGISTER_REQ });


    axios.post(API_SERVER_URL + "/users/register", {

        username: registerPayload.username,
        email: registerPayload.email,
        password: registerPayload.password

    },
        {
            headers:
            {
                "Accept": "application/json"
            }
        })
        .then((response) =>
        {
            if (response.status === 201)//201 created
            {
                dispatch({ type: Types.REGISTER_SUCCESS });
                console.log(registerPayload);
                history.push(pathConsts.login + "?msg=Register success");
            }
            else
            {
                console.log(JSON.stringify(response));
                //console.log("registration error: " + response.data.errorMessage);
                dispatch({ type: Types.REGISTER_FAIL, payload: { error: response.data } });
                //console.warn(response.data.errorMessage);
            }
        }).catch((error) =>
        {
            dispatch({ type: Types.REGISTER_FAIL, payload: { error: error } });
        });
    /*
    setTimeout(() => 
    {
        dispatch({ type: Types.REGISTER_SUCCESS });

        console.log(registerPayload);
        history.push(pathConsts.login);
    }, 1000)*/
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