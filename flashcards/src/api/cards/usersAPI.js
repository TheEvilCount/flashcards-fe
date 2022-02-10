import axios from "axios";
import { apiRequestTimeout } from "../../config/config";
import { API_SERVER_URL } from "../../config/paths";


const getCurrent = () =>
{
    return axios.get(API_SERVER_URL + "/users/current",
        {
            withCredentials: true,
            timeout: apiRequestTimeout,
            headers:
            {
                "Accept": "application/json"
            }
        }
    )
};

/**
 * reeturns request which updates user preferences
 * @param {object} newPrefs . {"darkmode":false, "flipLeft":true}
 * @returns axios.put
 */
const updatePrefs = (newPrefs) =>
{
    return axios.put(API_SERVER_URL + "/users/updateprefs",
        newPrefs,
        {
            withCredentials: true,
            timeout: apiRequestTimeout,
            headers:
            {
                "Accept": "application/json"
            }
        }
    )
};

const usersAPI = {
    getCurrent,
    updatePrefs
};

export default usersAPI;