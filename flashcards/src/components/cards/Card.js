import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Button, Card as CardMui, CardContent, Typography } from '@mui/material';
import { useMutationDeleteCard } from 'api/react-query hooks/useCards';

const Card = ({ card, collectionId, openUpdateModal }) =>
{
    const [isVisible, setisVisible] = useState(0);
    const isLeftSpin = useSelector(state => state.auth.parsedPrefs.flipLeft);//1;//TODO add toggle to profile and save it somewhere; ?store/localstorage?

    const { id, frontText, backText } = card;

    const mutationDeleteCard = useMutationDeleteCard(collectionId);

    function answer()
    {
        if (isVisible === 0)
            setisVisible(1);
        else
            setisVisible(0);
    };

    let classes = "card";

    const deleteCard = () =>
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
    }


    return (
        <div className={isVisible ? (classes + " show" + (isLeftSpin ? "-left" : "-right")) : (classes)} onClick={() => answer()}>
            <CardMui className="front">
                <Typography className='card-text' flexWrap={'wrap'} textOverflow={'ellipsis'} overflow={'clip'}>{frontText}</Typography>
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
            </CardMui>

            <CardMui className={"back back" + (isLeftSpin ? "-left" : "-right")}>
                <Typography className='card-text'>{backText}</Typography>
            </CardMui>
        </div>
    )
}
export default React.memo(Card);