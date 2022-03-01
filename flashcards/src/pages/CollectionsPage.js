import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';
import axios from 'axios';
import { useQuery } from 'react-query';

import { Pagination, TextField, Button, Fab, Card, ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Collections from '../components/collection/Collections';
import apiReqConfig from '../config/apiReqConfig';
import ErrorLoadingDataWrapper from '../components/ErrorLoadingDataWrapper';
import usePagination from '../hooks/usePagination';
import useEditDialog from '../components/collection/useEditCollectionModal';
import useCreateCollectionDialog from 'components/collection/useCreateCollectionModal';
import { KEY_COLLECTIONS, useQueryFavIdsCollections } from 'api/react-query hooks/useCollections';

export const collectionDisplayTypes = {
    private: "private",
    public: "public",
    favourite: "favourite",
};

const CollectionsPage = (props) =>
{
    const { type } = useParams();
    const [qType, setqType] = useState("my");

    const [search, setSearch] = useState("");
    const { page, pageSize, pageMax, setPageTo: setPage, setPageMax } = usePagination(1, 9, 1);

    const dispatch = useDispatch();

    //reseting page to 1 when type of collection changes
    useEffect(() =>
    {
        if (qType !== type)
        {
            setPage(1);
            setqType(type);
        }

        return () =>
        {
            setPage(1);
            setqType("");
        }
    }, [type, setPage])



    const getCollectionsRequest = (type, page, pageSize, search) =>
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

    const getCollectionsRQ = async (typeC, page, pageSize, search) =>
    {
        const { data } = await axios.request(getCollectionsRequest(typeC || null, page, pageSize, search))
        return data;
    };

    const { data: dataCollections, error: errorCollections, isLoading: isLoadingCollections, refetch: requestGetCollections } =
        useQuery([KEY_COLLECTIONS, type, page, search],
            () => getCollectionsRQ(type, page, pageSize, search),
            {
                keepPreviousData: true,
                enabled: true,
                onSuccess: (data) => { setPageMax(data?.maxPages) }
            }
        );

    const { data: dataFavs, error: errorFavs, isLoading: isLoadingFavs, refetch: refetchFavouriteIds } = useQueryFavIdsCollections();

    const refetchCallback = useCallback(
        () =>
        {
            refetchFavouriteIds();
            requestGetCollections();
        },
        [refetchFavouriteIds, requestGetCollections],
    )


    //modal edit stuff
    const [modal, openModal] = useEditDialog(requestGetCollections);
    const openEditModal = useCallback(
        (colData) =>
        {
            openModal(colData)
        },
        [openModal],
    )

    //modal create stuff
    const [modalCreate, openModalCreate] = useCreateCollectionDialog(requestGetCollections);
    const openCreateModal = useCallback(
        () =>
        {
            openModalCreate()
        },
        [openModalCreate],
    )

    return (
        <>
            <h2>Collections - {type}</h2>
            <Card>
                <ButtonGroup variant='contained' color='secondary'>
                    <Button onClick={() => { dispatch(goBack()) }}>Go back</Button>
                    <Button onClick={requestGetCollections}>Refresh</Button>
                </ButtonGroup>

                <Fab variant='circular' color="primary" aria-label="add" onClick={() => openCreateModal()}><AddIcon /></Fab>
                {
                    type === "explore" &&
                    <TextField color='primary' label={"Search:"} onChange={(e) => { setSearch(e.target.value) }} value={search} />
                    //TODO search by category???
                }
            </Card>
            <ErrorLoadingDataWrapper isLoading={isLoadingCollections && isLoadingFavs} error={errorCollections || errorFavs} retryRequest={requestGetCollections}>
                {modal}
                {modalCreate}
                <Collections favsIds={dataFavs} collections={dataCollections?.collections} displayType={getType(type)} refreshCollectionsCallback={refetchCallback} openEditModal={openEditModal} />
                <Pagination
                    style={{ display: "grid", placeContent: "center", marginBottom: "2em" }}
                    color={'primary'}
                    defaultPage={1} page={page} count={pageMax}
                    onChange={(event, value) => setPage(value)}
                />
            </ErrorLoadingDataWrapper>
        </>
    )
};
export default React.memo(CollectionsPage)