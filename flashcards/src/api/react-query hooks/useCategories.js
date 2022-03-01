import categoriesAPI from "api/categoriesAPI";
import { useQuery } from "react-query";


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

export default useCategories;