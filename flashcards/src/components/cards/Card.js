import React, { useState } from 'react'

const Card = ({ card }) =>
{
    const [isVisible, setisVisible] = useState(0);
    const isLeftSpin = 1;//TODO add toggle to profile and save it somewhere; ?store/localstorage?

    const { id, frontText, backText } = card;

    function answer(params)
    {
        if (isVisible === 0)
            setisVisible(1);
        else
            setisVisible(0);
    };

    let classes = "card";

    return (
        <div className={isVisible ? (classes + " show" + (isLeftSpin ? "-left" : "-right")) : (classes)} onClick={() => answer(this)}>
            <div className="front">
                <p>{frontText}</p>
            </div>

            <div className={"back back" + (isLeftSpin ? "-left" : "-right")}>
                <p>{backText}</p>
            </div>
        </div>
    )
}
export default React.memo(Card);