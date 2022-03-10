import collectionsAPI from "api/collectionsAPI";
import { useMutation, useQuery, useQueryClient } from "react-query";


export const KEY_COLLECTIONS = "collections";


//create mutation
export const useMutationCreateCollection = () =>
{
    const queryClient = useQueryClient();
    const mutationCreateCollection = useMutation((newCollection) =>
    {
        return collectionsAPI.postCollection(
            newCollection.title, newCollection.collectionColor, newCollection.visibility, newCollection.category)
    }, {
        onSuccess: () =>
        {
            queryClient.invalidateQueries(KEY_COLLECTIONS);
        }
    });

    return mutationCreateCollection;
}

//update mutation
export const useMutationUpdateCollection = () =>
{
    const queryClient = useQueryClient();
    const mutationUpdateCollection = useMutation((updatedCollection) =>
    {
        return collectionsAPI.updateCollection(
            updatedCollection.id, updatedCollection.title, updatedCollection.collectionColor, updatedCollection.category)
    }, {
        onSuccess: () =>
        {
            queryClient.invalidateQueries(KEY_COLLECTIONS);
        }
    });
    return mutationUpdateCollection;
}

//publish mutation
export const useMutationPublishCollection = () =>
{
    const queryClient = useQueryClient();
    const mutationPublishCollection = useMutation((collectionId) =>
    {
        return collectionsAPI.publishCollection(collectionId)
    }, {
        onSuccess: () =>
        {
            queryClient.invalidateQueries(KEY_COLLECTIONS);
            queryClient.invalidateQueries(KEY_COLLECTIONS_FAV_IDS);
        }
    });
    return mutationPublishCollection;
}
//privatize mutation
export const useMutationPrivatizeCollection = () =>
{
    const queryClient = useQueryClient();
    const mutationPrivatizeCollection = useMutation((collectionId) =>
    {
        return collectionsAPI.privatizeCollection(collectionId)
    }, {
        onSuccess: () =>
        {
            queryClient.invalidateQueries(KEY_COLLECTIONS);
            queryClient.invalidateQueries(KEY_COLLECTIONS_FAV_IDS);
        }
    });
    return mutationPrivatizeCollection;
}


//_____getters______


//get ids of favourite collections
const getFavsRQ = async () =>
{
    const { data } = await collectionsAPI.getCollections.favourite(0, 0);
    //Converting fav collections data to array of its ids
    const ids = [];
    data?.collections.forEach((el) => { ids.push(el.id) });
    return ids;
};
export const KEY_COLLECTIONS_FAV_IDS = "favCollectionsIds";

export const useQueryFavIdsCollections = () =>
{
    const query = useQuery(
        KEY_COLLECTIONS_FAV_IDS,
        () => getFavsRQ(),
        {
            enabled: true,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            onSuccess: (data) =>
            {
                console.log(data)
            }
        }
    );
    return query;
}


/* 
const getCollectionsRQ = async (type, page, pageSize) =>
{
    const { data } = type===0 ? await collectionsAPI.getCollections.public(page, pageSize) : await collectionsAPI.getCollections.private(page, pageSize);
    return data;
};

const useCategories = (type) => useQuery(
    KEY_COLLECTIONS,
    () => { getCollectionsRQ(type) },
    {
        enabled: true,
        refetchOnWindowFocus: false,
        retry: 3,
    }
);

export default useCategories; */