import axios from "axios";
import apiReqConfig from "../../config/apiReqConfig";

/**
 * Returns request for getting all categories
 * @returns axios request
 */
const getCategoriesReq = () =>
{
    return axios.request(apiReqConfig.categories.getCategories());
};

/**
 * Returns request for creation of new category
 * @param {string} title category title
 * @returns axios request
 */
const postCategoriesReq = (title) =>
{
    return axios.request(apiReqConfig.categories.postCategory(title));
};

const categoriesAPI = {
    getCategories: getCategoriesReq,
    postCategories: postCategoriesReq
};

export default categoriesAPI;