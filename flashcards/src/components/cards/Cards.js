import React, { useState, Component } from 'react'
import "./cards.css"

export default class Cards extends Component
{
    shuffleCards()
    {
        if (this.props.cardList)
            this.shuffleArray(this.props.cardList);
    }

    shuffleArray(array)
    {
        for (let i = array.length - 1; i > 0; i--) 
        {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    createCardsFromData()
    {
        if (this.props.cardList && this.props.cardList.length > 0)
        {
            return this.props.cardList.map(card => <Card key={card.id} card={card}></Card>);
        }
        else
            return <div>No cards yet.</div>;

    }

    render()
    {
        this.shuffleCards();    //shuffle cards

        return (
            <div className="wrapper">
                {this.createCardsFromData()}
            </div>
        );
    }
}

function Card(props)
{
    const [isVisible, setisVisible] = useState(0);

    function answer(params)
    {
        if (isVisible === 0)
            setisVisible(1);
        else
            setisVisible(0);
    };

    let classes = "card";

    return (
        <div className={isVisible ? classes + " show" : classes} onClick={() => answer(this)}>
            <div className="front">
                <p>{props.card.question}</p>
            </div>

            <div className="back">
                <p>{props.card.answer}</p>
            </div>
        </div>
    )

}