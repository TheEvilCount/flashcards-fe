import React, { useCallback } from 'react';

import { goBack } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardList from '../components/cards/CardList';
import ErrorLoadingDataWrapper from '../components/ErrorLoadingDataWrapper';

import { Button, Card, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useCreateCardDialog from 'components/cards/useCreateCardModal';
import useUpdateCardDialog from 'components/cards/useUpdateCardModal';
import { useQueryCollectionDetail } from 'api/react-query hooks/useCards';

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

    return (
        <>
            <h2>Collection: {data?.title}</h2>
            <Card>
                <Button variant='contained' color='secondary' onClick={() => { dispatch(goBack()) }}>Go back</Button>
                <Fab variant='circular' color="primary" aria-label="add" onClick={() => openCreateModal(id)}><AddIcon /></Fab>
            </Card>
            {modalCreate}
            {modalUpdate}
            <ErrorLoadingDataWrapper isLoading={isLoading} error={error} retryRequest={refetch}>
                <CardList collectionDetail={data} openUpdateModal={openUpdateModal}></CardList>
            </ErrorLoadingDataWrapper>
        </>
    )
};
export default CollectionDetailPage;