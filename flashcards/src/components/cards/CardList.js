import React, { useEffect } from 'react'
import Card from './Card';
import "./cards.scss"

const CardList = ({ cardList }) =>
{
    useEffect(() =>
    {
        shuffleCards();    //shuffle cards
    }, []);

    function shuffleCards()
    {
        if (cardList)
            this.shuffleArray(cardList);
    }

    function shuffleArray(array)
    {
        for (let i = array.length - 1; i > 0; i--) 
        {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCardsFromData()
    {
        if (cardList && cardList.length > 0)
        {
            return cardList.map(card => <Card key={card.id} card={card}></Card>);
        }
        else
            return <div>No cards yet.</div>;

    }


    return (
        <div className="cards-wrapper">
            {createCardsFromData()}
        </div>
    );
}
export default CardList;
