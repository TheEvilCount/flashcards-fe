import axios from "axios";
import apiReqConfig from "../config/apiReqConfig";

/**
 * Returns request for getting data of currently logged user
 * @returns axios request
 */
const getCurrent = () =>
{
    return axios.request(apiReqConfig.users.getCurrent());
};

/**
 * returns request which updates user preferences
 * @param {object} newPrefs . {"darkmode":false, "flipLeft":true}
 * @returns axios request
 */
const updatePrefs = (newPrefs) =>
{
    return axios.request(apiReqConfig.users.updatePrefs(newPrefs));
};

/**
 * Returns request for getting all admin accounts (only for admins!)
 * @returns axios request
 */
const getAdmins = () =>
{
    return axios.request(apiReqConfig.users.getAdmins());
}

/**
 * Returns request for getting all admin accounts (only for admins!)
 * @returns axios request
 */
const promoteUserToAdmin = (userId) =>
{
    return axios.request(apiReqConfig.users.promoteUserToAdmin(userId));
}

/**
 * Returns request for getting all registered users (only for admins!)
 * @returns axios request
 */
const getAll = () =>
{
    return axios.request(apiReqConfig.users.getAll());
};

const usersAPI = {
    getCurrent,
    updatePrefs,
    getAdmins,
    promoteUserToAdmin,
    getAll
};

export default usersAPI;