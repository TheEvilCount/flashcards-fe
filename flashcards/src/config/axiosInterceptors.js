import axios from "axios";
import { logoutAction } from "../state/actions";
import { store } from "../state/store";

//logout when unauthorize status appears
export const useLogoutOnUnAuth = (error) =>
{
    const dispatch = store.dispatch;
    //console.warn("___logout interceptor: " + JSON.stringify(error))
    if (error?.response?.status === 401)
    {
        //console.warn("___logout interceptor success")
        dispatch(logoutAction());//TODO or revoke login
    }
    return error;
}

//error response reject when error code
export const useRejectOnBadStatus = (error) =>
{
    useLogoutOnUnAuth(error);
    //console.log(error.response.status)
    return Promise.reject(error); // i didn't have this line before
}


//for timeout
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
    clearTimeout((response?.config)?.["timeoutId"])
    return response;
}