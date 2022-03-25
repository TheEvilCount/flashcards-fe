import authAPI from "api/authAPI";
import { useMutation } from "react-query";


//verify account mutation
export const useMutationVerifyAccount = (token) =>
{
    const mutation = useMutation(() =>
    {
        return authAPI.verify(token);
    });

    return mutation;
}

//verify account mutation
export const useMutationResendVerifyEmail = () =>
{
    const mutation = useMutation((email) =>
    {
        return authAPI.resend(email);
    });

    return mutation;
}