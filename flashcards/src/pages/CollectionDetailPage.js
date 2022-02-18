import React from 'react';
import useAxios from 'axios-hooks';
import apiReqConfig from '../config/apiReqConfig';

import { goBack } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardList from '../components/cards/CardList';
import ErrorLoadingDataWrapper from '../components/ErrorLoadingDataWrapper';
import { Button } from '@material-ui/core';

const CollectionDetailPage = () =>
{

    const { id } = useParams();
    const dispatch = useDispatch();

    const [{ data, loading, error }, request] = useAxios(apiReqConfig.cards.getCardsFromCollection(id), {});

    const [{ data: dataCreate, loading: isLoadingCreate, error: errorCreate, response: responseCreate }, requestCreate] = useAxios(
        apiReqConfig.cards.createCardWithinCollection, { manual: true });


    return (
        <>
            <Button variant='contained' onClick={() => { dispatch(goBack()) }}>Go back</Button>
            <ErrorLoadingDataWrapper isLoading={loading} error={error} retryRequest={request}>
                <CardList cardList={data}></CardList>
            </ErrorLoadingDataWrapper>
        </>
    )
};
export default CollectionDetailPage;