import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';
import axios from 'axios';
import { useQuery } from 'react-query';

import { Pagination, TextField, Button, Card, ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Collections from '../components/collection/Collections';
import apiReqConfig from '../config/apiReqConfig';
import ErrorLoadingDataWrapper from '../components/ErrorLoadingDataWrapper';
import usePagination from '../hooks/usePagination';
import useEditCollectionDialog from '../components/collection/useEditCollectionModal';
import useCreateCollectionDialog from 'components/collection/useCreateCollectionModal';
import { KEY_COLLECTIONS, useQueryFavIdsCollections } from 'api/react-query-hooks/useCollections';
import ContentWrapper from 'components/ContentWrapper';
import useIsMobile from 'hooks/useIsMobile';

export const collectionDisplayTypes = {
    private: "private",
    public: "public",
    favourite: "favourite",
};

const CollectionsPage = () =>
{
    const { type } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [qType, setqType] = useState("my");

    const [search, setSearch] = useState("");
    const { page, pageSize, pageMax, setPageTo: setPage, setPageMax } = usePagination(1, 6, 1);

    const dispatch = useDispatch();

    //reseting page to 1 when type of collection changes
    useEffect(() =>
    {
        setPage(1);
        setqType(type);

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
    const [modal, openModal] = useEditCollectionDialog(requestGetCollections);
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

    const isMobile = useIsMobile();

    return (
        <ContentWrapper>
            <Card className='padded' style={{ paddingInline: "1em", paddingBottom: "8px", marginBottom: "1em" }}>
                <h2>Collections - {type}</h2>
                <div style={{ justifyContent: "space-between", display: "flex" }}>
                    <Button variant='contained' color="primary" aria-label="add"
                        onClick={() => openCreateModal()}
                        startIcon={!isMobile && <AddIcon />}
                        style={{ height: "fit-content", alignSelf: "center" }}>
                        {
                            isMobile ? <AddIcon /> : <span className='invisible-mobile'>Create</span>
                        }
                    </Button>
                    {
                        type === "explore" &&
                        <TextField style={{ marginInline: "0.3em" }} color='primary' label={"Search:"} onChange={(e) => { setSearch(e.target.value) }} value={search} />
                        //TODO search by category???
                    }
                    <ButtonGroup variant='contained' color='secondary' style={{ height: "fit-content", alignSelf: "center" }}>
                        <Button onClick={requestGetCollections}>{isMobile ? <RefreshIcon /> : "Refresh"}</Button>
                        <Button onClick={() => { dispatch(goBack()) }}>{isMobile ? <ArrowBackIcon /> : "Go back"}</Button>
                    </ButtonGroup>
                </div>
            </Card>
            <ErrorLoadingDataWrapper isLoading={isLoadingCollections && isLoadingFavs} error={errorCollections || errorFavs} retryRequest={requestGetCollections}>
                {modal}
                {modalCreate}
                <div className='padded padded-mobile'>
                    <Collections favsIds={dataFavs} collections={dataCollections?.collections} displayType={getType(type)} refreshCollectionsCallback={refetchCallback} openEditModal={openEditModal} />
                    <Pagination
                        style={{ display: "grid", placeContent: "center", marginBottom: "2em", marginTop: "1em" }}
                        color={'primary'}
                        defaultPage={1} page={page} count={pageMax}
                        onChange={(event, value) => setPage(value)}
                    />
                </div>
            </ErrorLoadingDataWrapper>
        </ContentWrapper>
    )
};
export default React.memo(CollectionsPage)