import axios from "axios";
import apiReqConfig from "../../config/apiReqConfig";

/**
 * Returns request which creates new collection based on params
 * @param {number} type 0-private, 1-public, 2-favourite
 * @param {number} page page number
 * @param {number} pageSize items on page
 * @returns axios request
 */
const getCollectionsReq = (type, page, pageSize) =>
{
    return axios.request(apiReqConfig.collections.getCollections.generic(type, page, pageSize));
};

const getCollectionsPrivateReq = (page, pageSize) =>
{
    return getCollectionsReq(0, page, pageSize)
};

const getCollectionsPublicReq = (page, pageSize) =>
{
    return getCollectionsReq(1, page, pageSize)
};

const getCollectionsFavouriteReq = (page, pageSize) =>
{
    return getCollectionsReq(2, page, pageSize)
};

/**
 * Returns request which creates new collection based on params
 * @param {string} title 
 * @param {string} color 
 * @param {string} visibility (PRIVATE | PUBLIC)
 * @param {number} categoryID 
 * @returns axios request
 */
const postCollectionReq = (title, color, visibility = "PRIVATE", categoryID) =>
{
    return axios.request(apiReqConfig.collections.postCollection(title, color, visibility, categoryID));
};

/**
 * Returns request which retrieves collections based on search param
 * @param {string} title search string
 * @param {number} page 
 * @param {number} pageSize 
 * @returns axios request
 */
const discoverCollectionsReq = (title, page = 1, pageSize = 60) =>
{
    return axios.request(apiReqConfig.collections.discoverCollections(title, page, pageSize))
};

const collectionsAPI = {
    getCollections: {
        private: getCollectionsPrivateReq,
        public: getCollectionsPublicReq,
        favourite: getCollectionsFavouriteReq
    },
    postCollection: postCollectionReq,
    discoverCollections: discoverCollectionsReq
};

export default collectionsAPI;