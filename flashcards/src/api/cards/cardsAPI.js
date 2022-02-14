import axios from "axios";
import apiReqConfig from "../../config/apiReqConfig";

/**
 * Returns request for getting all cards within collection
 * @param {number} collectionID id of collection
 * @returns axios request
 */
const getCardsFromCollectionReq = (collectionID) =>
{
    return axios.request(apiReqConfig.cards.getCardsFromCollection(collectionID));
};

/**
 * Returns request for creation of card within collection
 * @param {number} collectionID id of collection
 * @param {string} frontText text on the frontside of the card
 * @param {string} backText text on the backside of the card
 * @returns axios request
 */
const createCardWithinCollectionReq = (collectionID, frontText, backText) =>
{
    return axios.request(apiReqConfig.cards.createCardWithinCollection(collectionID, frontText, backText));
};

const cardsAPI = {
    getCardsFromCollection: getCardsFromCollectionReq,
    createCardWithinCollection: createCardWithinCollectionReq,
};

export default cardsAPI;