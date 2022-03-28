import PropTypes from "prop-types"
import { Button } from '@mui/material';
import React, { useCallback, useState } from 'react'
import { shuffleArray } from "helpers/shuffleArray";
import PlayComponent from "./PlayComponent";

const PlayWrapper = ({ cards, ...props }) =>
{
    const [currentCardIdx, setCurrentCard] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const [cardsArr, setCardsArr] = useState(cards);

    const shuffleCards = useCallback(() =>
    {
        if (cardsArr)
            setCardsArr(shuffleArray(cards));
    }, [cardsArr, cards])

    const next = () =>
    {
        if (currentCardIdx < cards.length - 1)
            setCurrentCard(value => value + 1);
        else
            setIsEnd(true);
    }

    const prev = () =>
    {
        if (currentCardIdx >= 0)
        {
            if (isEnd) { setIsEnd(false); return; }
            setCurrentCard(value => value - 1);
        }
    }

    return (
        <div style={{ display: "grid", justifyItems: "center", marginTop: "2em" }} {...props}>
            <PlayComponent
                cardIdx={currentCardIdx}
                cardCount={cardsArr?.length || 0}
                card={cardsArr[currentCardIdx] || {}}
                next={next}
                prev={prev}
                isEnd={isEnd}
                isStart={currentCardIdx === 0 && !isEnd}
            />
            {cardsArr?.length > 0 && <Button variant="contained" color="secondary" onClick={shuffleCards} className="mt-2">Shuffle</Button>}
        </div>
    );
}

PlayWrapper.propTypes = {
    cards: PropTypes.array
}

export default PlayWrapper;