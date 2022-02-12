import React, { useCallback, useEffect, useState } from "react";



/**
 * @deprecated
 * Custom implemetation of useAxios for use with pre-defined axios calls
 * @param {*} apiCall 
 * @returns [ {response, error, isLoading}, refetch ]
 */
const useAxiosMy = (apiCall) =>
{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () =>
    {
        setIsLoading(true);
        await apiCall
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
            });
    }, [apiCall]);

    useEffect(() =>
    {
        fetchData();
    }, [apiCall]);

    return [{ data, error, isLoading }, fetchData];
};

export default useAxiosMy;