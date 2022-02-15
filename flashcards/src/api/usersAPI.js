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

const usersAPI = {
    getCurrent,
    updatePrefs
};

export default usersAPI;