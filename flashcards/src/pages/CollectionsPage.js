import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';

import Collections from '../components/collection/Collections';
import { Button } from '@material-ui/core';
import { goBack } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { Pagination, TextField } from '@mui/material';
import apiReqConfig from '../config/apiReqConfig';
import ErrorLoadingDataWrapper from '../components/ErrorLoadingDataWrapper';
import usePagination from '../hooks/usePagination';
import useEditDialog from '../components/collection/useEditCollectionModal';

export const collectionDisplayTypes = {
    private: "private",
    public: "public",
    favourite: "favourite",
};

const CollectionsPage = (props) =>
{
    const { type } = useParams();
    const [search, setSearch] = useState("");

    const [{ page, pageSize, pageMax }, setPageTo, ...pg] = usePagination(1, 9, 10);

    const getCollectionsRequest = (type) =>
    {
        if (type === "my") return apiReqConfig.collections.getCollections.private(page, pageSize);
        if (type === "explore") return apiReqConfig.collections.discoverCollections(search, page, pageSize);
        if (type === "top") return apiReqConfig.collections.getCollections.public(page, pageSize);
        if (type === "favourite") return apiReqConfig.collections.getCollections.favourite(page, pageSize);

        return null;
    }

    const getType = (type) =>
    {
        if (type === "my") return collectionDisplayTypes.private;
        if (type === "explore") return collectionDisplayTypes.public;
        if (type === "top") return collectionDisplayTypes.public;
        if (type === "favourite") return collectionDisplayTypes.favourite;
        return collectionDisplayTypes.private;
    }

    const [{ data: dataCollections, loading: isLoadingCollections, error: errorCollections, response: responseCollections }, requestGetCollections] = useAxios(
        getCollectionsRequest(type || null), { manual: true }
    );

    const [{ data: dataFavs, loading: isLoadingFavs, error: errorFavs, response: responseFavs }, getFavs] = useAxios(
        apiReqConfig.collections.getCollections.favourite(null, null), { manual: true }
    );

    const [favsIds, setfavsIds] = useState([]);

    useEffect(() =>
    {
        getFavs()
            .then((response) =>
            {
                const ids = [];
                response?.data?.forEach((e) => { ids.push(e.id) });
                setfavsIds(ids);
            });
    }, []);

    useEffect(() =>
    {
        requestGetCollections();
    }, [requestGetCollections, type]);

    const refreshCollectionsCallback = useCallback(
        () =>
        {
            requestGetCollections()
        },
        [requestGetCollections],
    )

    const dispatch = useDispatch();

    const handlePagChange = (event, value) =>
    {
        setPageTo(value);
    };


    const [modal, openModal] = useEditDialog(refreshCollectionsCallback);

    const openEditModal = useCallback(
        (colData) =>
        {
            openModal(colData)
        },
        [openModal],
    )


    return (
        <>
            <h2>Collections - {type}</h2>
            <Button variant='contained' onClick={() => { dispatch(goBack()) }}>Go back</Button>
            <Button variant='contained' color='primary' onClick={refreshCollectionsCallback}>Refresh</Button>
            {
                type === "explore" &&
                <TextField color='primary' label={"Search:"} onChange={(e) => { setSearch(e.target.value) }} value={search} />
                //TODO search by category???
            }

            <ErrorLoadingDataWrapper isLoading={isLoadingCollections} error={errorCollections} retryRequest={requestGetCollections}>
                {modal}
                <Collections favs={favsIds} collections={dataCollections} displayType={getType(type)} refreshCollectionsCallback={refreshCollectionsCallback} openEditModal={openEditModal} />
                <Pagination
                    style={{ display: "grid", placeContent: "center", marginBottom: "2em" }}
                    color={'primary'}
                    defaultPage={1} page={page} count={pageMax}
                    onChange={handlePagChange}
                />{/* TODO maxPage */}
            </ErrorLoadingDataWrapper>
        </>
    )
};
export default React.memo(CollectionsPage)