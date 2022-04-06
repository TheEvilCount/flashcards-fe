import PropTypes from "prop-types"
import { Button } from '@mui/material';
import React, { useCallback, useState } from 'react'
import { shuffleArray } from "helpers/shuffleArray";
import PlayComponent from "./PlayComponent";

const PlayWrapper = ({ cards, ...props }) =>
{
    const [currentCardIdx, setCurrentCardIdx] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const [cardsArr, setCardsArr] = useState(cards);


    const restart = useCallback(() =>
    {
        setCurrentCardIdx(0);
        setIsEnd(false);
    }, [])

    const shuffleCards = useCallback(() =>
    {
        if (cardsArr)
        {
            setCardsArr(shuffleArray(cards));
            restart();
        }
    }, [cardsArr, cards, restart])

    const next = () =>
    {
        if (currentCardIdx < cards.length - 1)
            setCurrentCardIdx(value => value + 1);
        else
            setIsEnd(true);
    }

    const prev = () =>
    {
        if (currentCardIdx >= 0)
        {
            if (isEnd) { setIsEnd(false); return; }
            setCurrentCardIdx(value => value - 1);
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
            <div className='mt-2' style={{ gap: "1em", display: "flex", justifyContent: "center" }}>
                {cardsArr?.length > 0 && <Button variant="contained" color="secondary" onClick={shuffleCards}>Shuffle</Button>}
                {currentCardIdx > 0 && <Button variant="contained" color="secondary" onClick={restart}>Restart</Button>}
            </div>
        </div>
    );
}

PlayWrapper.propTypes = {
    cards: PropTypes.array
}

export default PlayWrapper;