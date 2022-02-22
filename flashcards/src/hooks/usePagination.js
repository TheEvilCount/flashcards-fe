import { useEffect, useState } from "react";


const usePagination = (defaultPage = 1, defaultPageSize = 30, defaultPageMax = 10) =>
{
    const [page, setPage] = useState(defaultPage);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [pageMax, setPageMax] = useState(defaultPageMax);


    //TODO useCallbac for all....


    const nextPage = () =>
    {
        setPage(page => page++);
    }

    const previousPage = () =>
    {
        setPage(page => page--);
    }

    const setPageTo = (to) =>
    {
        setPage(to);
    }

    const lastPage = () =>
    {
        setPageTo(pageMax);
    }

    return [{ page, pageSize, pageMax }, { setPageTo, setPageMax }, { nextPage, previousPage, lastPage }];
}
export default usePagination;