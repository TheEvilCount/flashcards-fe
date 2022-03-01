import { useCallback, useState } from "react";


const usePagination = (defaultPage = 1, defaultPageSize = 30, defaultPageMax = 10) =>
{
    const [page, setPage] = useState(defaultPage);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [pageMax, setPageMax] = useState(defaultPageMax);


    //TODO useCallbac for all....


    const nextPage = () =>
    {
        setPage((page) => page += 1);
    }

    const previousPage = () =>
    {
        setPage((page) => page -= 1);
    }

    const setPageTo = useCallback((to) =>
    {
        setPage(to);
        //const pageNumber = Math.max(1, to);
        //setPage((page) => Math.min(pageNumber, pageMax));
    }, []);

    const lastPage = () =>
    {
        setPageTo(pageMax);
    }

    return { page, pageSize, pageMax, setPageTo, setPageMax, nextPage, previousPage, lastPage, setPageSize };
}
export default usePagination;