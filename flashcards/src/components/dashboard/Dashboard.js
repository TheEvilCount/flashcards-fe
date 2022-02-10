import React, { useState, useEffect } from 'react'

import { useLocation } from "react-router-dom";
import axios from "axios"

import SideNav from '../sideNav/SideNav';

import "./dashboard.scss"
import CardList from '../cards/CardList';

export default function Dashboard(props)
{
    const mockCardList = [
        { id: 1, question: "Question1", answer: "Answeer1", category: "english" },
        { id: 2, question: "Question2", answer: "Answeer2", category: "english" },
        { id: 3, question: "Question3", answer: "Answeer3", category: "english" },
        { id: 4, question: "Question4", answer: "Answeer1", category: "english" },
        { id: 5, question: "Question5", answer: "Answeer2", category: "english" },
        { id: 6, question: "Question6", answer: "Answeer3", category: "english" },
        { id: 7, question: "Question7", answer: "Answeer1", category: "english" },
        { id: 8, question: "Question8", answer: "Answeer2", category: "english" },
        { id: 9, question: "Question9", answer: "Answeer3", category: "english" },
        { id: 10, question: "Question10", answer: "Answeer4", category: "english" }
    ];

    const [cardList, setcardList] = useState();

    const search = useLocation().search;
    let cardsSP = new URLSearchParams(search).get("cards");

    useEffect(() =>
    {
        selectCards(cardsSP);
    }, [cardsSP]);

    useEffect(() =>
    {
        getCards();
    }, []);

    const getCards = () =>
    {
        axios.get("https://opentdb.com/api.php?amount=30&category=18")//TODO mock data cards
            .then(res =>
            {
                setcardList(res.data.results.map((item, index) =>
                {
                    return {
                        id: index,
                        question: item.question,
                        answer: item.correct_answer
                    }
                }))
            })
    }

    function selectCards(selector)
    {
        console.log(selector)
        switch (selector)
        {
            default:
            case "my":
                setcardList(mockCardList)//TODO mock data cards
                break;
            case "explore":
                setcardList(mockCardList);//TODO mock data cards
                break;
            case "top":
                setcardList(mockCardList.slice(3, 8));//TODO mock data cards
                break;
            case "sub":
                setcardList(mockCardList.slice(5, 10));//TODO mock data cards
                break;
        }
    }

    return (
        <div className="wrapperHome">
            {/* <div className="sideNav">
                <SideNav></SideNav>
            </div> */}
            <div className="contentHome">
                <div>{cardsSP}</div>
                <CardList cardList={cardList}></CardList>
            </div>
        </div>
    )
}
