import usersAPI from "api/usersAPI";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const KEY_ADMINS = "admins";

const getAdminsRQ = async () =>
{
    const { data } = await usersAPI.getAdmins();
    return data;
};

export const useAdmins = () => useQuery(
    KEY_ADMINS,
    getAdminsRQ,
    {
        enabled: true,
        refetchOnWindowFocus: false,
        retry: 3,
        cacheTime: 60
    }
);

//promote mutation
export const useMutationPromoteUser = () =>
{
    const queryClient = useQueryClient();
    const mutation = useMutation((userId) =>
    {
        return usersAPI.promoteUserToAdmin(userId)
    }, {
        onSuccess: () =>
        {
            queryClient.invalidateQueries(KEY_ADMINS);
        }
    });

    return mutation;
}