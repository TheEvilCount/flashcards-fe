import axios from "axios";
import { logoutAction } from "../state/actions";
import { store } from "../state/store";


export const responseInterceptorResponse = (response) =>
{
    clearTimeout((response?.config)?.["timeoutId"]);

    if (response?.status === 401)
    {
        if (store.getState().auth.isLogged)
            store.dispatch(logoutAction());//TODO or revoke login
    }
    return response;
}

export const responseInterceptorError = (error) =>
{
    if (error?.response?.status === 401)
    {
        console.log(error)
        if (store.getState().auth.isLogged)
            store.dispatch(logoutAction());//TODO or revoke login
        return error;
    }

    /* if (error?.response?.status === 409)
    {
        console.log("interc_ 409");
        return Promise.resolve(error.response);
    } */

    if (error.message === "TIMEOUT")
    {
        console.error("timeout");
        return Promise.reject({ ...error, code: "ETIMEDOUT" })
    }
    return Promise.reject(error.response || error);
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
