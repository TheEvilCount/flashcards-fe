import { getPaginationParams } from "../api/helpers";
import { apiRequestTimeout } from "./config";
import { API_SERVER_URL } from "./paths";

//________Collections________

/**
 * Returns configuration for creation of new collection based on params
 * @param {number} type 0-private, 1-public, 2-favourite
 * @param {number} page page number
 * @param {number} pageSize items on page
 * @returns request configuration
 */
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
 * Returns configuration for creation of new collection based on params
 * @param {string} title 
 * @param {string} color 
 * @param {string} visibility (PRIVATE | PUBLIC)
 * @param {number} categoryID 
 * @returns request configuration
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
    return {
        url: API_SERVER_URL + `/collections/discover?title=${title}`,
        params: getPaginationParams(page, pageSize),
        method: "GET",
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json"
        }
    }
}

//_______Categories________

/**
 * Returns configuration for getting all categories
 * @returns request configuration
 */
const getCategories = () =>
{
    return {
        url: API_SERVER_URL + "/categories",
        method: "GET",
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json"
        }
    }
};

/**
 * Returns configuration for creation of new category
 * @param {string} title category title
 * @returns request configuration
 */
const postCategory = (title) =>
{
    return {
        url: API_SERVER_URL + "/categories",
        method: "POST",
        data: {
            title: title
        },
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json"
        }
    }
};


//________Cards________

/**
 * Returns configuration for getting all cards within collection
 * @param {number} collectionID id of collection
 * @returns request configuration
 */
const getCardsFromCollection = (collectionID) =>
{
    return {
        url: API_SERVER_URL + `/collections/${collectionID}/cards`,
        method: "GET",
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json"
        }
    }
};

/**
 * Returns configuration for creation of card within collection
 * @param {number} collectionID id of collection
 * @param {string} frontText text on the frontside of the card
 * @param {string} backText text on the backside of the card
 * @returns request configuration
 */
const createCardWithinCollection = (collectionID, frontText, backText) =>
{
    return {
        url: API_SERVER_URL + `/collections/${collectionID}/cards`,
        method: "POST",
        data: {
            frontText: frontText,
            backText: backText
        },
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json"
        }
    }
};


//______Users______

/**
 * Returns configuration for getting data of currently logged user
 * @returns request configuration
 */
const getCurrentUser = () =>
{
    return {
        url: API_SERVER_URL + "/users/current",
        method: "GET",
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json"
        }
    }
};

/**
 * returns configuration for updating user preferences
 * @param {object} newPrefs . {"darkmode":false, "flipLeft":true}
 * @returns request configuration
 */
const updateUserPrefs = (newPrefs) =>
{
    return {
        url: API_SERVER_URL + "/users/updateprefs",
        method: "POST",
        data: newPrefs,
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json"
        }
    }
};



//______Auth______

/**
 * Returns configuration for registration of new user account
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @returns request configuration
 */
const register = (username, email, password) =>
{
    var data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);

    return {
        url: API_SERVER_URL + "/users/register",
        method: "POST",
        data: {
            email: email,
            username: username,
            password: password
        },
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
};

/**
 * Returns configuration for login user
 * @param {string} email 
 * @param {string} password 
 * @returns request configuration
 */
const login = (email, password) =>
{
    var data = new FormData();
    data.append("email", email);
    data.append("password", password);
    // data.append("remember", loginPayload.remember);

    return {
        url: API_SERVER_URL + "/login",
        method: "POST",
        data: data,
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data'
        }
    }
};

/**
 * Returns configuration of user logout
 * @returns request configuration
 */
const logout = () =>
{
    return {
        url: API_SERVER_URL + "/logout",
        method: "POST",
        withCredentials: true,
        timeout: apiRequestTimeout
    }
};

/**
 * Returns configuration for verification user account
 * @param {string} token verification token
 * @returns request configuration
 */
const verify = (token) =>
{
    return {
        url: API_SERVER_URL + `/users/verify?token=${token}`,
        method: "POST",
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json",
        }
    }
};

/**
 * Returns configuration for resending verification email for provided registered email address
 * @param {string} email 
 * @returns request configuration
 */
const resend = (email) =>
{
    return {
        url: API_SERVER_URL + `/users/resend?email=${email}`,
        method: "POST",
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json",
        }
    }
};

/**
 * Returns configuration for resetting lost password (sends reset link via email) of account with provided email address
 * @param {string} email 
 * @returns request configuration
 */
const lostPass = (email) =>
{
    return {
        url: API_SERVER_URL + `/users/lostpass?email=${email}`,
        method: "POST",
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json",
        }
    }
};

/**
 * Return configuration for setting new password with provided security token after old password is lost.
 * @param {string} token reset token
 * @param {string} newPassword new password
 * @returns request configuration
 */
const resetPass = (token, newPassword) =>
{
    return {
        url: API_SERVER_URL + `/users/resetpass?token=${token}&newPassword=${newPassword}`,
        method: "POST",
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json",
        }
    }
};

/**
 * Returns configuration for changing password
 * @param {string} oldPassword 
 * @param {string} newPassword 
 * @returns request configuration
 */
const changePass = (oldPassword, newPassword) =>
{
    return {
        url: API_SERVER_URL + `/users/changepass?oldPassword=${oldPassword}&newPassword=${newPassword}`,
        method: "POST",
        withCredentials: true,
        timeout: apiRequestTimeout,
        headers:
        {
            "Accept": "application/json",
        }
    }
};


const apiReqConfig = {
    collections: {
        getCollections: {
            private: getCollectionsPrivate,
            public: getCollectionsPublic,
            favourite: getCollectionsFavourite,
            generic: getCollections
        },
        postCollection,
        discoverCollections
    },
    categories: {
        getCategories,
        postCategory
    },
    cards: {
        getCardsFromCollection,
        createCardWithinCollection
    },
    users: {
        getCurrent: getCurrentUser,
        updatePrefs: updateUserPrefs
    },
    auth: {
        register,
        login,
        logout,
        verify,
        resend,
        lostPass,
        resetPass,
        changePass
    }
};

export default apiReqConfig;