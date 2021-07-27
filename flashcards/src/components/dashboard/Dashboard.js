import React, { useState, useEffect } from 'react'
import axios from "axios"

import Cards from "../cards/Cards"
import SideNav from '../sideNav/SideNav';

import "./dashboard.scss"

export default function Dashboard()
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

    const [cardList, setcardList] = useState(mockCardList);

    useEffect(() =>
    {
        axios.get("https://opentdb.com/api.php?amount=20&category=18")
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

    }, [])

    return (
        <div className="wrapperHome">
            <div className="sideNav">
                <SideNav></SideNav>
            </div>
            <div className="contentHome">
                <Cards cardList={cardList}></Cards>
            </div>
        </div>
    )
}
