import axios from "axios";
import apiReqConfig from "../config/apiReqConfig";

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

/**
 * Returns request for deletion of card within collection
 * @param {number} collectionID id of collection
 * @param {string} cardID id of the card
 * @returns axios request
 */
const deleteCardWithinCollectionReq = (collectionID, cardID) =>
{
    return axios.request(apiReqConfig.cards.deleteCardWithinCollection(collectionID, cardID));
};

/**
 * Returns request for deletion of card within collection
 * @param {number} collectionID id of collection
 * @param {string} cardID ide of the card
 * @param {string} frontText text on the frontside of the card
 * @param {string} backText text on the backside of the card
 * @returns axios request
 */
const updateCardWithinCollectionReq = (collectionID, cardID, frontText, backText) =>
{
    return axios.request(apiReqConfig.cards.updateCardWithinCollection(collectionID, cardID, frontText, backText));
};

const cardsAPI = {
    getCardsFromCollection: getCardsFromCollectionReq,
    createCardWithinCollection: createCardWithinCollectionReq,
    deleteCardWithinCollection: deleteCardWithinCollectionReq,
    updateCardWithinCollection: updateCardWithinCollectionReq
};

export default cardsAPI;