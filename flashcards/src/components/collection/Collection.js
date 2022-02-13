import React, { useCallback } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { push } from 'connected-react-router'
import { Button, CardActionArea } from '@material-ui/core';
import { Card, CardContent, Container } from '@mui/material';

const Collection = ({ collection, type, ...p }) =>
{
    const { id, title, counterFav, counterDup, cardNum, category, collectionColor } = collection;
    const dispatch = useDispatch();

    const clickF = useCallback(() =>
    {
        dispatch(push(`collections/${id}/cards`))
    }, [dispatch])


    return (
        <Card {...p}
            style={{
                background: collectionColor || "red",
                marginBottom: "10px",
                border: "1px solid black",
                borderRadius: "0.5em",
                padding: "5px 20px"
            }}>
            <CardContent >
                <div>{title}</div>
                <div>category: {category}</div>
                <div><FaHeart />: {counterFav}</div>
                <div>cards in collection: {cardNum}</div>
                <Button variant='contained' color='primary' size='large' onClick={clickF} >Enter</Button>
            </CardContent>
            {type === "private" && (
                <div>
                    <Button onClick={() => { }}>Duplicate</Button>
                    <Button onClick={() => { }}>Add to Favs</Button>
                    <Button onClick={() => { }}>Edit</Button>
                    <Button onClick={() => { }}>Delete</Button>
                </div>
            )}
            {type === "public" && (
                <div>
                    <Button onClick={() => { }}>Duplicate</Button>
                    <Button onClick={() => { }}>Add to Favs</Button>
                </div>
            )}
            {type === "favorite" && (
                <div>
                    <Button onClick={() => { }}>Duplicate</Button>
                </div>
            )}
        </Card>
    )
};
Collection.propTypes = {

}
export default React.memo(Collection);