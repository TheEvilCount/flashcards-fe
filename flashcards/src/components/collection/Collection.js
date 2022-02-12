import React, { useCallback } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { push } from 'connected-react-router'

const Collection = (props) =>
{
    const { id, title, counterFav, counterDup, cardNum, category, collectionColor, ...p } = props.collection;
    const dispatch = useDispatch();

    const clickF = useCallback(() =>
    {
        dispatch(push(`collections/${id}/cards`))
    }, [dispatch])


    return (
        <div {...p} style={{ background: collectionColor || "red", marginBottom: "10px" }} onClick={clickF} >
            <div>{title}</div>
            <div>category: {category}</div>
            <div><FaHeart />: {counterFav}</div>
            <div>cards:{cardNum}</div>
        </div>
    )
};
Collection.propTypes = {

}
export default React.memo(Collection);