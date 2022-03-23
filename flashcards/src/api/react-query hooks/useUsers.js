import usersAPI from "api/usersAPI";
import { useQuery } from "react-query";

export const KEY_USERS = "user";

const getUsersRQ = async () =>
{
    const { data } = await usersAPI.getAll();
    return data;
};

export const useUsers = () => useQuery(
    KEY_USERS,
    getUsersRQ,
    {
        enabled: true,
        refetchOnWindowFocus: false,
        retry: 3,
        cacheTime: 60
    }
);