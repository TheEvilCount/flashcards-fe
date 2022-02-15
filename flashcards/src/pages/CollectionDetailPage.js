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

    const [{ data, isLoading, error }, request] = useAxios(apiReqConfig.cards.getCardsFromCollection(id), {});


    return (
        <>
            <Button variant='contained' onClick={() => { dispatch(goBack()) }}>Go back</Button>
            <ErrorLoadingDataWrapper isLoading={isLoading} error={error} retryRequest={request}>
                <CardList cardList={data}></CardList>
            </ErrorLoadingDataWrapper>
        </>
    )
};
export default CollectionDetailPage;