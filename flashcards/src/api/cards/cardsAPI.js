import axios from "axios";
import { apiRequestTimeout } from "../../config/config";
import { API_SERVER_URL } from "../../config/paths";

//get card
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
    /* return axios.get(API_SERVER_URL + `/collections/${collectionID}/cards`,
        {
            withCredentials: true,
            timeout: apiRequestTimeout,
            headers:
            {
                "Accept": "application/json"
            },
        }
    ) */
};

//post card
const createCardWithinCollection = (collectionID, frontText, backText) =>
{
    return axios.post(API_SERVER_URL + `/collections/${collectionID}/cards`,
        {
            frontText: frontText,
            backText: backText
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

const cardsAPI = {
    getCardsFromCollection,
    createCardWithinCollection,
};

export default cardsAPI;