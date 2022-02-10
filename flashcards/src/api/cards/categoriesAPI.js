import axios from "axios";
import { apiRequestTimeout } from "../../config/config";
import { API_SERVER_URL } from "../../config/paths";


const getCategories = () =>
{
    return axios.get(API_SERVER_URL + "/categories",
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

const postCategories = (title) =>
{
    return axios.post(API_SERVER_URL + "/categories",
        {
            title: title
        },
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

const categoriesAPI = {
    getCategories,
    postCategories
};

export default categoriesAPI;