import authAPI from "api/authAPI";
import { useMutation } from "react-query";

//lost password mutation
export const useMutationLostPass = () =>
{
    const mutation = useMutation((email) =>
    {
        return authAPI.lostPass(email)
    });

    return mutation;
}

//reset password mutation
export const useMutationResetPass = () =>
{
    const mutation = useMutation((payload) =>
    {
        return authAPI.resetPass(payload.token, payload.password)
    });

    return mutation;
}