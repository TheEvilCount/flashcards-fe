import { Button, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import useAxios from 'axios-hooks';
import { goBack } from 'connected-react-router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import cardsAPI from '../../api/cards/cardsAPI';
import collectionsAPI from '../../api/cards/collectionsAPI';
import CardList from '../cards/CardList';

export const CollectionDetail = () =>
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

    const { id } = useParams();
    const dispatch = useDispatch();

    const [cardList, setcardList] = useState();

    const getCards = () =>
    {
        axios.get("https://opentdb.com/api.php?amount=30&category=18", { withCredentials: false })//TODO mock data cards
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
            .catch(e => { setcardList(mockCardList) })
    }

    /* useEffect(() =>
    {
        getCards();
    }, []); */

    const [{ data, isLoading, error }, request] = useAxios(
        cardsAPI.getCardsFromCollection(id)
    )


    return (
        isLoading ?
            <CircularProgress />
            :
            <>
                <Button variant='contained' onClick={() => { dispatch(goBack()) }}>Go back</Button>
                <CardList cardList={data}></CardList>
            </>
    )
};
