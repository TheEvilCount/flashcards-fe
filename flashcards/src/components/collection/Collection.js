import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'

import { Card, CardActions, CardContent, Button, ButtonGroup, Typography, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpIcon from '@mui/icons-material/Help';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CollectionIcon from '@mui/icons-material/Collections';
import VisibilityIcon from '@mui/icons-material/Visibility';

import useAxios from 'axios-hooks';
import apiReqConfig from "../../config/apiReqConfig";

const Collection = (
    { collection, type, refreshCollectionsCallback, openEditModal, isFaved = false, ...p }
) =>
{
    const { id, title, counterFav, counterDup, cardNum, category, collectionColor } = collection;
    const dispatch = useDispatch();

    const clickF = useCallback(() =>
    {
        dispatch(push(`collections/${id}/cards`))
    }, [dispatch, id])


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

    const favCollection = () =>//TODO mutation of favs
    {//TODO
        requestFav()
            .then(() =>
            {
                alert("fav success");
            })
            .then(() =>
            {
                refreshCollectionsCallback();
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
            .then(() =>
            {
                refreshCollectionsCallback();
            })
            .catch((error) =>
            {
                alert("unfav error: " + error.response?.data?.errorMessage || error);
                //console.error(error);
            })
    }

    const btnDuplicate = (innerText) => <Tooltip title={innerText} placement={'top-end'}><Button variant='contained' color='secondary' onClick={duplicate}>Duplicate <HelpIcon fontSize='small' /></Button></Tooltip>;
    return (
        <Card {...p}
            style={{
                background: "#" + collectionColor || "#FFFFFF",
                marginBottom: "10px",
                border: "1px solid black",
                borderRadius: "0.5em",
                paddingRight: "10px"
            }}>
            {/* {data && <Snackbar>{data}</Snackbar>} */}
            <Typography variant="h6" component={"h1"} textAlign={'center'}>{title}</Typography>
            <CardContent style={{
                display: "flex",
                paddingRight: "5px",
                justifyContent: "space-evenly"
            }}>
                <div style={{ display: "grid" }}>
                    <div>category: {category}</div>
                    <Tooltip title={"Collection visibility"} placement={'top-start'}><span><VisibilityIcon />: {collection.visibility}</span></Tooltip>
                    <div><FavoriteIcon htmlColor='red' />:{counterFav}</div>
                    <Tooltip title={"Number of private duplications"} placement={'top-start'}><span><DynamicFeedIcon />: {counterDup}</span></Tooltip>
                    <Tooltip title={"Number of card within collection"} placement={'top-start'}><span><CollectionIcon />: {cardNum}</span></Tooltip>
                </div>
                <CardActions style={{ backgroundColor: "rgba(255, 255, 255, 0.55)", borderRadius: "1em", /* flexWrap: "wrap", */ display: "flex", flexDirection: "column" }}>
                    <Button variant='contained' color='primary' size='large' onClick={clickF} style={{ margin: "4px 8px" }} >Enter</Button>
                    {type === "private" && (
                        <ButtonGroup orientation='vertical'>
                            {btnDuplicate("Duplicate")}
                            <Button onClick={() => openEditModal(collection)}>Edit <EditIcon /></Button>
                            <Button onClick={deleteCollection}>Delete<DeleteForeverIcon /></Button>
                        </ButtonGroup>
                    )}
                    {type === "public" && (
                        <ButtonGroup orientation='vertical'>
                            {btnDuplicate("Duplicate to private")}
                            {
                                isFaved ?
                                    <Button onClick={unfavCollection}>Remove from favs <FavoriteIcon htmlColor='red' /></Button> :
                                    <Button onClick={favCollection}>Add to Favs<FavoriteIcon htmlColor='darkgray' /></Button>
                            }
                        </ButtonGroup>
                    )}
                    {type === "favourite" && (
                        <ButtonGroup orientation='vertical'>
                            {btnDuplicate("Duplicate to private")}
                            <Button onClick={unfavCollection}>Remove from favs <FavoriteIcon htmlColor='red' /></Button>
                        </ButtonGroup>
                    )}
                </CardActions>

            </CardContent>
        </Card >
    )
};
Collection.propTypes = {

}
export default React.memo(Collection);