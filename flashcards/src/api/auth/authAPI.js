import axios from "axios";
import { apiRequestTimeout } from "../../config/config";
import { API_SERVER_URL } from "../../config/paths";


const register = (username, email, password) =>
{
    axios.post(API_SERVER_URL + "/users/register",
        {
            username: username,
            email: email,
            password: password
        },
        {
            headers:
            {
                "Accept": "application/json"
            },
            timeout: apiRequestTimeout
        }
    )
};

const login = (email, password) =>
{
    var data = new FormData();
    data.append("email", email);
    data.append("password", password);
    // data.append("remember", loginPayload.remember);
    return axios.post(API_SERVER_URL + "/login",
        data,
        {
            headers:
            {
                "Accept": "application/json",
                'Content-Type': 'multipart/form-data'
            },
            timeout: apiRequestTimeout
        }
    )
};

const logout = () =>
{
    return axios.post(API_SERVER_URL + "/logout",
        {},
        {
            withCredentials: true,
            timeout: apiRequestTimeout
        }
    )
};

const verify = (token) =>
{
    return axios.post(API_SERVER_URL + `/users/verify?token=${token}`,
        {},
        {
            withCredentials: true,
            timeout: apiRequestTimeout,
            headers:
            {
                "Accept": "application/json",
            },
        }
    )
};

const resend = (email) =>
{
    return axios.post(API_SERVER_URL + `/users/resend?email=${email}`,
        {},
        {
            withCredentials: true,
            timeout: apiRequestTimeout,
            headers:
            {
                "Accept": "application/json",
            },
        }
    )
};

const lostPass = (email) =>
{
    return axios.post(API_SERVER_URL + `/users/lostpass?email=${email}`,
        {},
        {
            withCredentials: true,
            timeout: apiRequestTimeout,
            headers:
            {
                "Accept": "application/json",
            },
        }
    )
};

const resetPass = (token, newPassword) =>
{
    return axios.post(API_SERVER_URL + `/users/resetpass?token=${token}&newPassword=${newPassword}`,
        {},
        {
            withCredentials: true,
            timeout: apiRequestTimeout,
            headers:
            {
                "Accept": "application/json",
            },
        }
    )
};

const changePass = (oldPassword, newPassword) =>
{
    return axios.post(API_SERVER_URL + `/users/changepass?oldPassword=${oldPassword}&newPassword=${newPassword}`,
        {},
        {
            withCredentials: true,
            timeout: apiRequestTimeout,
            headers:
            {
                "Accept": "application/json",
            },
        }
    )
};

const authAPI = {
    register,
    login,
    logout,
    verify,
    resend,
    lostPass,
    resetPass,
    changePass
};

export default authAPI;