import React, { useCallback } from 'react';

import { goBack } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardList from '../components/cards/CardList';
import ErrorLoadingDataWrapper from '../components/ErrorLoadingDataWrapper';

import { Button, Card } from '@mui/material';

import useCreateCardDialog from 'components/cards/useCreateCardModal';
import useUpdateCardDialog from 'components/cards/useUpdateCardModal';
import { useQueryCollectionDetail } from 'api/react-query-hooks/useCards';
import useEditCollectionDialog from 'components/collection/useEditCollectionModal';

const CollectionDetailPage = () =>
{
    const { id } = useParams();
    const dispatch = useDispatch();

    const { data, error, isLoading, refetch } = useQueryCollectionDetail(id);

    //modal create stuff
    const [modalCreate, openModalCreate] = useCreateCardDialog(refetch);
    const openCreateModal = useCallback(
        (data) =>
        {
            console.log("create modal - collectionId:" + data)
            openModalCreate(data);
        },
        [openModalCreate],
    );

    //modal update stuff
    const [modalUpdate, openModalUpdate] = useUpdateCardDialog(refetch);
    const openUpdateModal = useCallback(
        (data) =>
        {
            openModalUpdate(data);
        },
        [openModalUpdate],
    );


    //modal info collection (edit only private collection)
    const [modalC, openModalC] = useEditCollectionDialog(refetch);
    const openCollectionModal = useCallback(
        (colData, isReadOnly) =>
        {
            openModalC(colData, isReadOnly);
        },
        [openModalC],
    )

    return (
        <>
            <Card style={{ display: "inline-flex", padding: "0.1em 0.5em", width: "100%" }}>
                <h2>Collection: {data?.title}</h2>
                <span style={{ display: "inline-flex", alignItems: "center", marginLeft: "auto" }}>
                    <Button variant='contained' color='secondary' onClick={() => { dispatch(goBack()) }}>Go back</Button>
                </span>
            </Card>
            {modalCreate}
            {modalUpdate}
            {modalC}
            <ErrorLoadingDataWrapper isLoading={isLoading} error={error} retryRequest={refetch}>
                <CardList
                    collectionDetail={data}
                    openUpdateModal={openUpdateModal}
                    openCreateModal={openCreateModal}
                    openCollectionModal={openCollectionModal}
                />
            </ErrorLoadingDataWrapper>
        </>
    )
};
export default CollectionDetailPage;