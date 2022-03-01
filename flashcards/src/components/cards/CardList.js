import { Alert, Button } from '@mui/material';
import { shuffleArray } from 'helpers/shuffleArray';
import React, { useCallback, useEffect, useState } from 'react'
import Card from './Card';
import "./cards.scss"

const CardList = ({ collectionDetail, openUpdateModal }) =>
{
    const { cardList, id, title, collectionColor } = collectionDetail;

    const [cardListState, setCardListState] = useState(null);

    useEffect(() =>
    {
        setCardListState(cardList);

        return () =>
        {
            setCardListState(null);
        }
    }, [cardList])


    const shuffleCards = useCallback(() =>
    {
        if (cardListState)
            setCardListState(shuffleArray(cardListState));
    }, [cardListState, setCardListState])


    const cardElements = (cardList) =>
    {
        if (cardList && cardList.length > 0)
        {
            return cardList.map(card => <Card key={card.id} card={card} collectionId={id} openUpdateModal={openUpdateModal}></Card>);
        }
        else
            return (<Alert severity='info'>No card present. Do you want create one?</Alert>)

    }

    return (
        <>
            <Button onClick={() => { shuffleCards() }}>Shuffle</Button>
            <div className="cards-wrapper">
                {cardElements(cardListState)}
            </div>
        </>
    );
}
export default CardList;
