import axios from "axios";
import apiReqConfig from "../config/apiReqConfig";

/**
 * Returns request for registration of new user account
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @returns axios request
 */
const registerReq = (username, email, password) =>
{
    return axios.request(apiReqConfig.auth.register(username, email, password));
};

/**
 * Returns request for login user
 * @param {string} email 
 * @param {string} password 
 * @returns axios request
 */
const loginReq = (email, password) =>
{
    return axios.request(apiReqConfig.auth.login(email.charAt, password));
};

/**
 * Returns request of user logout
 * @returns axios request
 */
const logoutReq = () =>
{
    return axios.request(apiReqConfig.auth.logout());
};

/**
 * Returns request for verification user account
 * @param {string} token verification token
 * @returns axios request
 */
const verifyReq = (token) =>
{
    return axios.request(apiReqConfig.auth.verify(token));
};

/**
 * Returns request for resending verification email for provided registered email address
 * @param {string} email 
 * @returns axios request
 */
const resendReq = (email) =>
{
    return axios.request(apiReqConfig.auth.resend(email));
};

/**
 * Returns request for resetting lost password (sends reset link via email) of account with provided email address
 * @param {string} email 
 * @returns axios request
 */
const lostPassReq = (email) =>
{
    return axios.request(apiReqConfig.auth.lostPass(email));
};

/**
 * Return request for setting new password with provided security token after old password is lost.
 * @param {string} token reset token
 * @param {string} newPassword new password
 * @returns axios request
 */
const resetPassReq = (token, newPassword) =>
{
    return axios.request(apiReqConfig.auth.resetPass(token, newPassword));
};

/**
 * Returns request for changing password
 * @param {string} oldPassword 
 * @param {string} newPassword 
 * @returns axios request
 */
const changePassReq = (oldPassword, newPassword) =>
{
    return axios.request(apiReqConfig.auth.changePass(oldPassword, newPassword));
};

const authAPI = {
    register: registerReq,
    login: loginReq,
    logout: logoutReq,
    verify: verifyReq,
    resend: resendReq,
    lostPass: lostPassReq,
    resetPass: resetPassReq,
    changePass: changePassReq
};

export default authAPI;