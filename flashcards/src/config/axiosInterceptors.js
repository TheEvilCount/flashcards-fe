import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutAction } from "../state/actions";

//logout when unauthorize status appears
export const useLogoutOnUnAuth = (error) =>
{
    const dispatch = useDispatch();
    if (error?.response?.status === 401)
    {
        dispatch(logoutAction());//TODO or revoke login
    }
    return error;
}


export const useTimeout = (config) =>
{
    const cancelToken = axios.CancelToken.source()
    const timeoutId = setTimeout(
        () => cancelToken.cancel("TIMEOUT"),
        config.timeout,
    )

    return {
        ...config,
        timeoutId,
        cancelToken: cancelToken.token,
    }
}

export const handleTimeout = (error) =>
    Promise.reject(
        error.message === "TIMEOUT" ? { ...error, code: "ETIMEDOUT" } : error,
    )

export const useClearTimeout = (response) =>
{
    clearTimeout((response.config)["timeoutId"])
    return response
}