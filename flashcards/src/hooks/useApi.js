import { useEffect, useState } from "react";



/**
 * Custom implemetation of useAxios for use with pre-defined axios calls
 * @param {*} apiCall 
 * @returns [ {response, error, isLoading}, refetch ]
 */
const useApi = (apiCall) =>
{
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>
    {
        const request = async () =>
        {
            if (isLoading) return;
            setIsLoading(true);
            try
            {
                const result = await apiCall;
                setData(result.data);
                setError("");
            } catch (err)
            {
                setError(err.message || "Unexpected Error!");
            }
            finally
            {
                setIsLoading(false);
            }
            /* await apiCall
                .then((res) =>
                {
                    setData(res.data);
                    setError(null);
                })
                .catch((err) =>
                {
                    setError(err);
                })
                .finally(() =>
                {
                    setIsLoading(false);
                }); */
        }
    }, [apiCall]);

    /* useEffect(() =>
    {
        request();
    }, [apiCall]); */

    return { data, error, isLoading/* , request */ };
};
export default useApi;