import PropTypes from "prop-types";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { useSpring, a } from "@react-spring/web";

const CardSkeletonSpring = forwardRef(({ front, back, ...props }, ref) =>
{
    const [isFlipped, setIsFlipped] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [height, setHeight] = useState('initial');

    const isLeftSpin = useSelector(state => state.auth.parsedPrefs.flipLeft);

    const { transform, opacity } = useSpring({
        opacity: isFlipped ? 1 : 0,
        transform: !isLeftSpin ? `perspective(600px) rotateY(${isFlipped ? 180 : 360}deg)` : `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
        config: { mass: isReset ? 0 : 5, tension: 500, friction: 80 }
    });


    const localRef = useRef(null);
    const inputRef = ref || localRef;

    const frontEl = useRef();
    const backEl = useRef();

    const setMaxHeight = useCallback(() =>
    {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 200) + "px");
    }, [])

    useEffect(() =>
    {
        setMaxHeight();
    }, [front, back, isFlipped, setMaxHeight])

    useEffect(() =>
    {
        window.addEventListener('resize', setMaxHeight);
        return () => window.removeEventListener('resize', setMaxHeight);
    }, [setMaxHeight])

    const flip = useCallback(() =>
    {
        setIsFlipped(!isFlipped);
    }, [isFlipped])

    useImperativeHandle(
        inputRef,
        () => ({
            flip: () => { flip(); },
            reset: () => { reset(); }
        }),
        [flip],
    )

    function reset()
    {
        setIsReset(true);
        setIsFlipped(false);
        setTimeout(() =>
        {
            setIsReset(false);
        }, 1);
    }

    const st = isReset ? {} : { opacity: opacity.to((o) => 1 - o), transform };

    return (
        <div className={"flipper"} onClick={() => flip()} style={{ height: height }} {...props}>
            <a.div style={st} className="front">
                <div ref={frontEl}>
                    {front}
                </div>
            </a.div>
            <a.div className="back" ref={backEl} style={{
                opacity,
                transform,
                rotateY: !isLeftSpin ? "-180deg" : "180deg"
            }}>
                <div ref={backEl}>
                    {back}
                </div>
            </a.div>
        </div>
    )
})
CardSkeletonSpring.displayName = "CardSkeletonSpring"
CardSkeletonSpring.propTypes = {
    front: PropTypes.node,
    back: PropTypes.node,
    isFlipped: PropTypes.bool
}

export default React.memo(CardSkeletonSpring);