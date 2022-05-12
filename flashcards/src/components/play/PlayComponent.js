import PropTypes from "prop-types"
import { Alert, AlertTitle, Button, Card, Typography } from '@mui/material';
import CardSkeletonSpring from 'components/cards/CardSkeletonSpring';
import React, { useRef } from 'react'

const PlayComponent = ({ card = {}, next, prev, cardCount = 0, cardIdx, isEnd, isStart, shuffle, restart, ...props }) =>
{
    // eslint-disable-next-line no-unused-vars
    const { id, frontText, backText } = card;

    const cardRef = useRef();
    const reset = () => cardRef.current.reset();

    if (cardCount === 0) return <Alert severity="info">No cards to play</Alert>

    return (
        <>
            <div style={{ width: "100%", maxWidth: "500px" }} {...props}>
                <div style={{ textAlign: "center" }}>
                    <div>
                        {isEnd && <Card style={{ padding: "2em 3em", minHeight: "200px", textAlign: "center" }}><Alert>
                            <AlertTitle>Out of cards!</AlertTitle>
                        </Alert></Card>
                        }
                        {!isEnd && <CardSkeletonSpring ref={cardRef}
                            front={
                                <>
                                    <small>Question:</small>
                                    <span className="mt-1" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                        <Typography style={{ whiteSpace: 'pre-line', marginBottom: "2em" }} flexWrap={'wrap'} textOverflow={'ellipsis'} overflow={'clip'}>
                                            {frontText}
                                        </Typography>
                                    </span>
                                </>
                            }
                            back={
                                <>
                                    <small>Answer:</small>
                                    <span className="mt-1" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                        <Typography style={{ whiteSpace: 'pre-line', marginBottom: "2em" }} flexWrap={'wrap'} textOverflow={'ellipsis'} overflow={'clip'}>
                                            {backText}
                                        </Typography>
                                    </span>
                                </>
                            }
                        />}
                        <div className="mt-2">
                            <small>Hint: Tap card to flip</small>
                            <div><small>Card {cardIdx + 1}/{cardCount}</small></div>
                            {/* <MobileStepper position="static" variant="progress" steps={cardCount} activeStep={cardIdx + 1} /> */}
                        </div>
                    </div>
                    <div className='mt-2' style={{ gap: "1em", display: "flex", justifyContent: "center" }}>
                        <Button variant='contained' disabled={isStart} onClick={() => { prev(); cardRef.current && reset(); }}>Previous</Button>
                        <Button variant='contained' disabled={isEnd} onClick={() => { next(); cardRef.current && reset(); }}>Next</Button>
                    </div>
                </div>
            </div>
            <div className='mt-2' style={{ gap: "1em", display: "flex", justifyContent: "center" }}>
                {cardCount > 0 && <Button variant="contained" color="secondary" onClick={() => { cardRef.current && reset(); shuffle() }}>Shuffle</Button>}
                {cardIdx > 0 && <Button variant="contained" color="secondary" onClick={() => { cardRef.current && reset(); restart() }}>Restart</Button>}
            </div>
        </>
    );
}
PlayComponent.propTypes = {
    card: PropTypes.shape({
        backText: PropTypes.string,
        frontText: PropTypes.string,
        id: PropTypes.number
    }),
    isEnd: PropTypes.bool,
    isStart: PropTypes.bool,
    cardCount: PropTypes.number,
    cardIdx: PropTypes.number,
    next: PropTypes.func,
    prev: PropTypes.func,
    restart: PropTypes.func,
    shuffle: PropTypes.func
}

export default React.memo(PlayComponent);