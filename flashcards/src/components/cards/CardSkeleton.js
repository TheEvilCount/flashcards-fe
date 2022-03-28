import PropTypes from "prop-types"
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { useSelector } from "react-redux";
import { Card as CardMui } from '@mui/material';

const CardSkeleton = forwardRef(({ front, back, ...props }, ref) =>
{
    const [isVisible, setisVisible] = useState(false);
    const isLeftSpin = useSelector(state => state.auth.parsedPrefs.flipLeft);

    const localRef = useRef(null);
    const inputRef = ref || localRef;

    const flip = useCallback(() =>
    {
        if (isVisible === false)
            setisVisible(true);
        else
            setisVisible(false);
    }, [isVisible])

    useImperativeHandle(
        inputRef,
        () => ({
            flip: () => { flip(); },
            reset: () => { setisVisible(false); }
        }),
        [flip],
    )

    let classes = "flipper";

    return (
        <div className={isVisible ? (classes + " show" + (isLeftSpin ? "-left" : "-right")) : (classes)} onClick={() => flip()} {...props}>
            <CardMui className="front">
                {front}
            </CardMui>
            <CardMui className={"back back" + (isLeftSpin ? "-left" : "-right")}>
                {back}
            </CardMui>
        </div>
    )
})
CardSkeleton.displayName = "CardSkeleton"
CardSkeleton.propTypes = {
    front: PropTypes.node,
    back: PropTypes.node,
    isFlipped: PropTypes.bool
}

export default React.memo(CardSkeleton);