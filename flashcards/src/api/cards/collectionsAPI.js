import axios from "axios";
import { apiRequestTimeout } from "../../config/config";
import { API_SERVER_URL } from "../../config/paths";
import { getPaginationParams } from "../helpers";


const getCollections = (type, page, pageSize) =>
{
    return {
        url: API_SERVER_URL + `/collections?type=${type}`,
        params: getPaginationParams(page, pageSize),
        method: "GET",
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json"
        }
    }
    /* return axios.get(API_SERVER_URL + `/collections?type=${type}`,
        {
            withCredentials: true,
            timeout: apiRequestTimeout,
            headers:
            {
                "Accept": "application/json"
            },
            params: getPaginationParams(page, pageSize)
        }
    ) */
};

const getCollectionsPrivate = (page, pageSize) =>
{
    return getCollections(0, page, pageSize)
};

const getCollectionsPublic = (page, pageSize) =>
{
    return getCollections(1, page, pageSize)
};

const getCollectionsFavourite = (page, pageSize) =>
{
    return getCollections(2, page, pageSize)
};

/**
 * Returns request which creates new collection based on params
 * @param {string} title 
 * @param {string} color 
 * @param {string} visibility (PRIVATE | PUBLIC)
 * @param {number} categoryID 
 * @returns axios.post
 */
const postCollection = (title, color, visibility = "PRIVATE", categoryID) =>
{
    return {
        url: API_SERVER_URL + "/collections",
        method: "POST",
        data: {
            title: title,
            color: color,
            visibility: visibility,
            category: { id: categoryID }
        },
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json"
        }
    }
    /* return axios.post(API_SERVER_URL + "/collections",
        {
            title: title,
            color: color,
            visibility: visibility,
            category: { id: categoryID }
        },
        {
            withCredentials: true,
            timeout: apiRequestTimeout,
            headers:
            {
                "Accept": "application/json"
            }
        }
    ) */
};

/**
 * 
 * @param {string} title search string
 * @param {number} page 
 * @param {number} pageSize 
 * @returns 
 */
const discoverCollections = (title, page = 1, pageSize = 60) =>
{
    return axios.get(API_SERVER_URL + `/collections/discover?title=${title}`,
        {
            withCredentials: true,
            timeout: apiRequestTimeout,
            headers:
            {
                "Accept": "application/json"
            },
            params: getPaginationParams(page, pageSize)
        }
    )
};

const collectionsAPI = {
    getCollections: {
        private: getCollectionsPrivate,
        public: getCollectionsPublic,
        favourite: getCollectionsFavourite
    },
    postCollection,
    discoverCollections
};

export default collectionsAPI;