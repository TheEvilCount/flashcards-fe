import { Button, Card } from '@mui/material';
import { useQueryCollectionDetail } from 'api/react-query-hooks/useCards';
import ErrorLoadingDataWrapper from 'components/ErrorLoadingDataWrapper';
import { goBack } from 'connected-react-router';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ContentWrapper from "components/ContentWrapper";
import PlayWrapper from "components/play/PlayWrapper";

export default function PlayPage()
{
    const { id } = useParams();
    const dispatch = useDispatch();

    const { data, error, isLoading, refetch } = useQueryCollectionDetail(id);

    return (
        <ContentWrapper>
            <div id="play-page">
                <Card style={{ display: "inline-flex", padding: "0.1em 0.5em", width: "100%" }}>
                    <h2 style={{ whiteSpace: 'pre-line' }}>Learning: {data?.title}</h2>
                    <span style={{ display: "inline-flex", alignItems: "center", marginLeft: "auto" }}>
                        <Button variant='contained' color='secondary' onClick={() => { dispatch(goBack()) }}>Go back</Button>
                    </span>
                </Card>
                <div style={{ width: "100%" }}>
                    <ErrorLoadingDataWrapper isLoading={isLoading} error={error} retryRequest={refetch}>
                        <PlayWrapper cards={data?.cardList || []} />
                    </ErrorLoadingDataWrapper>
                </div>
            </div>
        </ContentWrapper>
    )
}