import axios from "axios";
import { logoutAction } from "../state/actions";
import { store } from "../state/store";


export const responseInterceptorResponse = (response) =>
{
    clearTimeout((response?.config)?.["timeoutId"]);

    if (response?.status === 401)
    {
        store.dispatch(logoutAction());//TODO or revoke login
    }

    return response;
}

export const responseInterceptorError = (error) =>
{
    if (error?.response?.status === 401)
    {
        store.dispatch(logoutAction());//TODO or revoke login
        return error;
    }

    if (error.message === "TIMEOUT")
        return { ...error, code: "ETIMEDOUT" }
    return Promise.reject(error);
}


//logout when unauthorize status appears
export const useLogoutOnUnAuth = (response) =>
{
    //console.warn("___logout interceptor: " + JSON.stringify(error))
    if (response?.status === 401)
    {
        //console.warn("___logout interceptor success")
        store.dispatch(logoutAction());//TODO or revoke login
    }
    return response;
}


//error response reject when error code
export const useRejectOnBadStatus = (error) =>
{
    return Promise.reject(error);
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