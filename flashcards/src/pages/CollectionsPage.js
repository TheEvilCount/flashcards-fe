import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';

import Collections from '../components/collection/Collections';
import { Button } from '@material-ui/core';
import { goBack } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import apiReqConfig from '../config/apiReqConfig';
import ErrorLoadingDataWrapper from '../components/ErrorLoadingDataWrapper';

const CollectionsPage = (props) =>
{
    const { type } = useParams();
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const getCollectionsRequest = (type) =>
    {
        if (type === "my") return apiReqConfig.collections.getCollections.private(page, 30);
        if (type === "explore") return apiReqConfig.collections.discoverCollections(search, page, 30);
        if (type === "top") return apiReqConfig.collections.getCollections.public(page, 30);
        if (type === "favourite") return apiReqConfig.collections.getCollections.favourite(page, 30);

        return null;
    }

    const getType = (type) =>
    {
        if (type === "my") return "private";
        if (type === "explore") return "public";
        if (type === "top") return "public";
        if (type === "favourite") return "favourite";
        return "private";
    }

    const [{ data: dataCollections, loading: isLoadingCollections, error: errorCollections }, getCollections] = useAxios(
        getCollectionsRequest(type || null), { manual: true }
    );

    useEffect(() =>
    {
        getCollections();
    }, [getCollections, type]);


    const dispatch = useDispatch();

    return (
        <>
            <h2>Collections - {type}</h2>
            <Button variant='contained' onClick={() => { dispatch(goBack()) }}>Go back</Button>
            {
                type === "explore" &&
                <TextField color='primary' label={"Search:"} onChange={(e) => { setSearch(e.target.value) }} value={search} />
            }

            <ErrorLoadingDataWrapper isLoading={isLoadingCollections} error={errorCollections} retryRequest={getCollections}>
                <Collections collections={dataCollections} displayType={getType(type)} />
            </ErrorLoadingDataWrapper>
        </>
    )
};
export default React.memo(CollectionsPage)