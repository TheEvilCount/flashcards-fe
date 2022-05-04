import PropTypes from "prop-types"
import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Button, Card as CardMui, Typography } from '@mui/material';
import { useMutationDeleteCard } from 'api/react-query-hooks/useCards';
import { useConfirm } from 'material-ui-confirm';

const Card = ({ card, collectionId, openUpdateModal, isOwned = false, color }) =>
{
    const { id, frontText, backText } = card;

    const [isVisible, setisVisible] = useState(0);
    const isLeftSpin = useSelector(state => state.auth.parsedPrefs.flipLeft);
    const confirm = useConfirm();
    const mutationDeleteCard = useMutationDeleteCard(collectionId);

    function answer()
    {
        if (isVisible === 0)
            setisVisible(1);
        else
            setisVisible(0);
    }

    const deleteCard = () =>
    {
        confirm({ description: "You cannot undo this action!" })
            .then(() =>
            {
                mutationDeleteCard.mutateAsync(id)
                    .then((response) =>
                    {
                        if (response.status === 200)
                        {
                            alert("card deleted");
                        }
                        else
                        {
                            alert(response?.data?.errorMessage || "Unexpected error");
                        }
                    })
                    .catch((error) =>
                    {
                        alert("Error: " + error?.response?.data?.errorMessage || "Unexpected error");
                    })
            })
    }

    let classes = "card";
    let borderStyle = "0 0 0 2px " + "#" + color || "FFFFFF"

    return (
        <div className={isVisible ? (classes + " show" + (isLeftSpin ? "-left" : "-right")) : (classes)} onClick={() => answer()}>
            <CardMui className="front" style={{ boxShadow: borderStyle }}>
                <Typography className='card-text' style={{ whiteSpace: 'pre-line' }} flexWrap={'wrap'} textOverflow={'ellipsis'} overflow={'clip'}>
                    {frontText}
                </Typography>
                {isOwned && (
                    <>
                        <Button onClick={(e) =>
                        {
                            e.stopPropagation();
                            deleteCard()
                        }
                        }>Delete</Button>
                        <Button onClick={(e) =>
                        {
                            e.stopPropagation();
                            openUpdateModal({ collectionId: collectionId, card: card })
                        }}>Update</Button>
                    </>
                )}
            </CardMui>

            <CardMui className={"back back" + (isLeftSpin ? "-left" : "-right")} style={{ boxShadow: borderStyle }}>
                <Typography className='card-text' style={{ whiteSpace: 'pre-line' }} flexWrap={'wrap'} textOverflow={'ellipsis'} overflow={'clip'}>
                    {backText}
                </Typography>
            </CardMui>
        </div>
    )
}

Card.propTypes = {
    card: PropTypes.shape({
        backText: PropTypes.string,
        frontText: PropTypes.string,
        id: PropTypes.number
    }),
    collectionId: PropTypes.number,
    isOwned: PropTypes.bool,
    openUpdateModal: PropTypes.func
}

export default React.memo(Card);