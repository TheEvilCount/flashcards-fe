import categoriesAPI from "api/categoriesAPI";
import { useMutation, useQuery, useQueryClient } from "react-query";


export const KEY_CATEGORIES = "categories";

const getCategoriesRQ = async () =>
{
    const { data } = await categoriesAPI.getCategories();
    return data;
};

const useCategories = () => useQuery(
    KEY_CATEGORIES,
    getCategoriesRQ,
    {
        enabled: true,
        refetchOnWindowFocus: false,
        retry: 3,
        cacheTime: 60
    }
);

//create category mutation
export const useMutationCreateCategory = () =>
{
    const queryClient = useQueryClient();
    const mutation = useMutation((newCategory) =>
    {
        return categoriesAPI.postCategories(newCategory.title)
    }, {
        onSuccess: () =>
        {
            queryClient.invalidateQueries(KEY_CATEGORIES);
        }
    });

    return mutation;
}

export default useCategories;