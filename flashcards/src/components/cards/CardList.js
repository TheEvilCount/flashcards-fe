import PropTypes from "prop-types"
import { Alert, Button, Card as CardMui } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { shuffleArray } from 'helpers/shuffleArray';
import React, { useCallback, useEffect, useState } from 'react'
import Card from './Card';
import "./cards.scss"
import useIsMyUsername from "hooks/useIsMyUsername";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import useIsMobile from "hooks/useIsMobile";

const CardList = ({ collectionDetail, openUpdateModal, openCreateModal, openCollectionModal }) =>
{
    const { cardList, id, owner,/* title, */collectionColor } = collectionDetail;

    const isOwned = useIsMyUsername(owner);

    const [cardListState, setCardListState] = useState(null);

    const dispatch = useDispatch();

    const isMobile = useIsMobile();

    useEffect(() =>
    {
        setCardListState(cardList);

        return () =>
        {
            setCardListState(null);
        }
    }, [cardList])

    const removeCard = (id) =>
    {
        let newList = cardListState.filter(card => card.id !== id)
        setCardListState(newList)
    }

    const shuffleCards = useCallback(() =>
    {
        if (cardListState)
            setCardListState(shuffleArray(cardListState));
    }, [cardListState, setCardListState])


    const cardElements = (cardList) =>
    {
        if (cardList && cardList.length > 0)
        {
            return cardList.map(card =>
                <Card key={card.id} card={card} collectionId={id} openUpdateModal={openUpdateModal} removeCardCallBack={removeCard} isOwned={isOwned} color={collectionColor} />);
        }
        else
            return (<Alert severity='info'>No card present. Do you want to create one?</Alert>)

    }

    return (
        <>
            <CardMui style={{ marginBottom: "10px", display: "flex", padding: "6px 10px" }}>
                {isOwned &&
                    <Button variant='contained' color="primary"
                        aria-label="add" onClick={() => openCreateModal(id)}
                        startIcon={!isMobile && <AddIcon />}
                        style={{ marginRight: "1em" }}>
                        {
                            isMobile ? <AddIcon /> : <span className='invisible-mobile'>Create</span>
                        }
                    </Button>}
                <Button onClick={() => { shuffleCards() }}>Shuffle</Button>
                <Button onClick={() => { dispatch(push("./play")) }}>Play</Button>
                <Button onClick={() => { openCollectionModal(collectionDetail, !isOwned) }}>Info</Button>
            </CardMui>
            <div className="cards-wrapper padded padded-mobile">
                {collectionDetail && cardElements(cardListState)}
            </div>
        </>
    );
}

CardList.propTypes = {
    collectionDetail: PropTypes.shape({
        cardList: PropTypes.array,
        id: PropTypes.any,
        owner: PropTypes.any,
        collectionColor: PropTypes.any
    }),
    openCreateModal: PropTypes.func,
    openUpdateModal: PropTypes.func,
    openCollectionModal: PropTypes.func
}

export default CardList;
