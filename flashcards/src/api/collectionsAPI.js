import axios from "axios";
import apiReqConfig from "../config/apiReqConfig";

/**
 * Returns request for getting collection detail by id
 * @param {number} id 
 * @returns axios request
 */
const getCollectionReq = (id) =>
{
    return axios.request(apiReqConfig.collections.getCollection(id));
};


/**
 * Returns request for getting collection based on params
 * @param {number} type 0-private, 1-public, 2-favourite
 * @param {number} page page number
 * @param {number} pageSize items on page
 * @returns axios request
 */
const getCollectionsReq = (type, page, pageSize) =>
{
    return axios.request(apiReqConfig.collections.getCollections.generic(type, page, pageSize));
};

/**
 * Returns request for getting private collection with pagination
 * @param {*} page page number
 * @param {*} pageSize items on page
 * @returns axios request
 */
const getCollectionsPrivateReq = (page, pageSize) =>
{
    return getCollectionsReq(0, page, pageSize)
};

/**
 * Returns request for getting public collection with pagination
 * @param {*} page page number
 * @param {*} pageSize items on page
 * @returns axios request
 */
const getCollectionsPublicReq = (page, pageSize) =>
{
    return getCollectionsReq(1, page, pageSize)
};

/**
 * Returns request for getting favourite collection with pagination
 * @param {*} page page number
 * @param {*} pageSize items on page
 * @returns axios request
 */
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

/**
 * Returns request for duplication collection based on params
 * @param {number} collectionID 
 * @returns axios request
 */
const duplicateCollectionsReq = (collectionID) =>
{
    return axios.request(apiReqConfig.collections.duplicateCollection(collectionID));
};

/**
 * Returns request for privatizing collection based on params
 * @param {number} collectionID 
 * @returns axios request
 */
const privatizeCollectionsReq = (collectionID) =>
{
    return axios.request(apiReqConfig.collections.privatizeCollection(collectionID));
};

/**
* Returns request for publidhing collection based on params
* @param {number} collectionID 
* @returns axios request
*/
const publishCollectionsReq = (collectionID) =>
{
    return axios.request(apiReqConfig.collections.publishCollection(collectionID));
};

/**
 * Returns request for deleting collection based on params
 * @param {number} collectionID 
 * @returns axios request
 */
const deleteCollectionReq = (collectionID) =>
{
    return axios.request(apiReqConfig.collections.deleteCollection(collectionID));
};

/**
 * Returns configuration for updating collection based on params
 * @param {number} collectionID id of updating collection
 * @param {string} title new title
 * @param {string} color new color
 * @param {string} category new category
 * @returns request configuration
 */
const updateCollectionReq = (collectionID, title, color, category) =>
{
    return axios.request(apiReqConfig.collections.updateCollection(collectionID, title, color, category));
};

const collectionsAPI = {
    getCollections: {
        private: getCollectionsPrivateReq,
        public: getCollectionsPublicReq,
        favourite: getCollectionsFavouriteReq
    },
    getCollection: getCollectionReq,
    postCollection: postCollectionReq,
    discoverCollections: discoverCollectionsReq,

    duplicateCollection: duplicateCollectionsReq,
    privatizeCollection: privatizeCollectionsReq,
    publishCollection: publishCollectionsReq,
    deleteCollection: deleteCollectionReq,
    updateCollection: updateCollectionReq
};

export default collectionsAPI;