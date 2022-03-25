import cardsAPI from "api/cardsAPI";
import collectionsAPI from "api/collectionsAPI";
import { useMutation, useQuery, useQueryClient } from "react-query";


//get collection detail (cards)
export const KEY_COLLECTION_DETAIL = "collDetail";

const getCollectionDetailRQ = async (collId) =>
{
    const { data } = await collectionsAPI.getCollection(collId);
    return data;
};

export const useQueryCollectionDetail = (id) =>
{
    const query = useQuery(
        [KEY_COLLECTION_DETAIL, id],
        () => getCollectionDetailRQ(id),
        {
            keepPreviousData: true,
            enabled: true,
            retry: 3
        }
    );
    return query;
}

//create mutation
export const useMutationCreateCard = (collectionId) =>
{
    const queryClient = useQueryClient();
    const mutation = useMutation((newCard) =>
    {
        return cardsAPI.createCardWithinCollection(
            collectionId, newCard.frontText, newCard.backText)
    }, {
        onSuccess: () =>
        {
            queryClient.invalidateQueries([KEY_COLLECTION_DETAIL, collectionId]);
        }
    });

    return mutation;
}

//update mutation
export const useMutationUpdateCard = (collectionId) =>
{
    const queryClient = useQueryClient();
    const mutation = useMutation((card) =>
    {
        return cardsAPI.updateCardWithinCollection(collectionId, card.id, card.frontText, card.backText);
    }, {
        onSuccess: () =>
        {
            queryClient.invalidateQueries([KEY_COLLECTION_DETAIL, collectionId]);
        }
    });

    return mutation;
}

//delete mutation
export const useMutationDeleteCard = (collectionId) =>
{
    const queryClient = useQueryClient();
    const mutation = useMutation((cardId) =>
    {
        return cardsAPI.deleteCardWithinCollection(
            collectionId, cardId)
    }, {
        onSuccess: () =>
        {
            queryClient.invalidateQueries([KEY_COLLECTION_DETAIL, collectionId]);
        }
    });

    return mutation;
}