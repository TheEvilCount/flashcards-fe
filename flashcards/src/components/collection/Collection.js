import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'

import { Button } from '@material-ui/core';
import { Card, CardActions, CardContent } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';

import apiReqConfig from "../../config/apiReqConfig";
import useAxios from 'axios-hooks';

const Collection = ({ collection, type, refreshCollectionsCallback, openEditModal, isFaved = false, ...p }) =>
{
    const { id, title, counterFav, counterDup, cardNum, category, collectionColor } = collection;
    const dispatch = useDispatch();

    const clickF = useCallback(() =>
    {
        dispatch(push(`collections/${id}/cards`))
    }, [dispatch])


    const [{ data: dataDuplicate, isLoading: isLoadingDuplicate, error: errorDuplicate }, request] = useAxios(
        apiReqConfig.collections.duplicateCollection(id), { manual: true }
    );

    const [{ data: dataDelete, isLoading: isLoadingDelete, error: errorDelete }, requestDelete] = useAxios(
        apiReqConfig.collections.deleteCollection(id), { manual: true }
    );

    const [{ data: dataFav, loading: isLoadingFav, error: errorFav, response: responseFav }, requestFav] = useAxios(
        apiReqConfig.collections.favCollection(id), { manual: true }
    );

    const [{ data: dataUnFav, loading: isLoadingUnFav, error: errorUnFav, response: responseUnFav }, requestUnFav] = useAxios(
        apiReqConfig.collections.unfavCollection(id), { manual: true }
    );

    const duplicate = () =>
    {//TODO
        request()
            .then(() =>
            {
                alert("duplication success");
            })
            .then(() =>
            {
                refreshCollectionsCallback();
            })
            .catch((error) =>
            {
                alert("duplicate error: " + error);
                console.error(error);
            })
    }

    const deleteCollection = () =>
    {//TODO
        requestDelete()
            .then(() =>
            {
                alert("deletion success");
            })
            .then(() =>
            {
                refreshCollectionsCallback();
            })
            .catch((error) =>
            {
                alert("deletion error: " + error);
                console.error(error);
            })
    }

    const favCollection = () =>
    {//TODO
        requestFav()
            .then(() =>
            {
                alert("fav success");
            })
            .catch((error) =>
            {
                alert("fav error: " + error.response?.data?.errorMessage || error);
                //console.error(error);
            })
    }

    const unfavCollection = () =>
    {//TODO
        requestUnFav()
            .then(() =>
            {
                alert("unfav success");
            })
            .catch((error) =>
            {
                alert("unfav error: " + error.response?.data?.errorMessage || error);
                //console.error(error);
            })
    }

    return (
        <Card {...p}
            style={{
                background: "#" + collectionColor || "#FFFFFF",
                marginBottom: "10px",
                border: "1px solid black",
                borderRadius: "0.5em",
                padding: "5px 20px"
            }}>
            {/* {data && <Snackbar>{data}</Snackbar>} */}
            <CardContent >
                <div>{title}</div>
                <div>category: {category}</div>

                <div style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1.5em",
                }}>
                    <span>visibility: {collection.visibility}</span>
                    <span><FavoriteIcon htmlColor='red' />:{counterFav}</span>
                    <span>duplicated: {counterDup}</span>
                </div>
                <div>cards: {cardNum}</div>
            </CardContent>
            <CardActions style={{ backgroundColor: "rgba(255, 255, 255, 0.45)", borderRadius: "1em", flexWrap: "wrap", display: "flex" }}>
                <Button variant='contained' color='primary' size='large' onClick={clickF} style={{ margin: "4px 8px" }} >Enter</Button>

                {type === "private" && (
                    <>
                        <Button variant='contained' onClick={duplicate}>Duplicate</Button>
                        <Button onClick={() => openEditModal(collection)}>Edit <EditIcon /></Button>
                        <Button onClick={deleteCollection}>Delete<DeleteForeverIcon /></Button>
                    </>
                )}
                {type === "public" && (
                    <>
                        <Button variant='contained' onClick={duplicate}>Duplicate to private</Button>
                        {
                            isFaved ?
                                <Button onClick={unfavCollection}>remove from favs <FavoriteIcon htmlColor='red' /></Button> :
                                <Button onClick={favCollection}>Add to Favs<FavoriteIcon htmlColor='darkgray' /></Button>
                        }
                    </>
                )}
                {type === "favorite" && (
                    <>
                        <Button onClick={duplicate}>Duplicate to private</Button>
                        <Button onClick={duplicate}>Unfav</Button>
                    </>
                )}
            </CardActions>
        </Card >
    )
};
Collection.propTypes = {

}
export default React.memo(Collection);