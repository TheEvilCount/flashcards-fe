import axios from "axios";

export const apiRequestTimeout = 1000 * 2;

axios.defaults.timeout = apiRequestTimeout;
axios.defaults.timeoutErrorMessage = "Request Timed Out!";
axios.defaults.withCredentials = true;