import PropTypes from "prop-types"
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
import { useMutationDeleteCollection, useMutationDuplicateCollection, useMutationFavCollection, useMutationUnfavCollection } from "api/react-query-hooks/useCollections";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useConfirm } from 'material-ui-confirm';

const Collection = (
    { collection, type, refreshCollectionsCallback, openEditModal, isFaved = false, isOwned, ...p }
) =>
{
    const { id, title, counterFav, counterDup, cardNum, category, collectionColor, owner } = collection;

    const dispatch = useDispatch();
    const confirm = useConfirm();

    const { type: typePath } = useParams();

    const clickF = useCallback(() =>
    {
        dispatch(push(`./${typePath}/${id}/cards`))
    }, [dispatch, id, typePath])

    const mutationDuplicateCollection = useMutationDuplicateCollection();
    const mutationDeleteCollection = useMutationDeleteCollection();
    const mutationFavCollection = useMutationFavCollection();
    const mutationUnfavCollection = useMutationUnfavCollection();

    const duplicate = () =>
    {
        mutationDuplicateCollection.mutateAsync(id)
            .then(() =>
            {
                toast.success("Collection duplicated.");
            })
            .then(() =>
            {
                refreshCollectionsCallback();
            })
            .catch((error) =>
            {
                toast.error("Duplication error: " + error?.data?.message || error);
                console.error(error);
            })
    }

    const deleteCollection = () =>
    {
        confirm({ description: "You cannot undo this action!" })
            .then(() =>
            {
                mutationDeleteCollection.mutateAsync(id)
                    .then(() =>
                    {
                        toast.success("Collection deleted.");
                    })
                    .then(() =>
                    {
                        refreshCollectionsCallback();
                    })
                    .catch((error) =>
                    {
                        toast.error("Deletion error: " + error?.data?.message || error);
                        console.error(error);
                    })
            })
    }

    const favCollection = () =>
    {
        mutationFavCollection.mutateAsync(id)
            .then(() =>
            {
                toast.success("Collection added to favourite");
            })
            .then(() =>
            {
                refreshCollectionsCallback();
            })
            .catch((error) =>
            {
                toast.error("Adding to favourite error: " + error?.data?.message || error);
                console.error(error?.data?.message || error);
            })
    }

    const unfavCollection = () =>
    {
        mutationUnfavCollection.mutateAsync(id)
            .then(() =>
            {
                toast.success("Collection removed from favourite");
            })
            .then(() =>
            {
                refreshCollectionsCallback();
            })
            .catch((error) =>
            {
                toast.error("Removing from collection error: " + error?.data?.message || error);
                console.error(error?.data?.message || error);
            })
    }

    const btnDuplicate = (innerText) => <Tooltip title={innerText} placement={'top-end'}>
        <Button variant='contained' color='secondary' onClick={duplicate}>
            Duplicate<HelpIcon style={{ marginLeft: "6px" }} fontSize='small' />
        </Button>
    </Tooltip>;

    const getBtnDuplicateByType = (type) =>
    {
        switch (type)
        {
            default:
            case "private":
                return btnDuplicate("Duplicate");
            case "public":
            case "favourite":
                return btnDuplicate("Duplicate to private");
        }
    }

    return (
        <Card {...p}
            style={{
                /* background: "#" + collectionColor || "#FFFFFF", */
                margin: "10px",
                /* border: "8px solid", */
                /* borderColor: "#" + collectionColor || "#FFFFFF", */
                borderRadius: "0.5em",
                backgroundClip: "padding-box",
                boxShadow: "0 0 0 10px " + "#" + collectionColor || "FFFFFF",
                paddingInline: "5px"
            }}>
            <div className="flex" style={{ justifyContent: "space-between", alignItems: "center", paddingInline: "auto" }}>
                <Typography variant="h6" component={"h1"} textAlign={'left'} marginRight={"10px"}>{title}</Typography>

                {type !== "private" &&
                    <Tooltip title={"Author"} placement={"top"}>
                        {isOwned ?
                            <small className="bold flex">My<HelpIcon style={{ marginLeft: "6px" }} fontSize='small' /></small>
                            :
                            (<small>{owner}</small>)
                        }
                    </Tooltip>
                }
            </div>
            <CardContent style={{
                padding: "10px 5px 10px 5px"
            }}>
                <div>category: {category}</div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "grid" }}>
                        <Tooltip title={"Collection visibility"} placement={'top-start'}><span><VisibilityIcon />: {collection.visibility}</span></Tooltip>
                        <div><FavoriteIcon />:{counterFav}</div>
                    </div>
                    <div style={{ display: "grid" }}>
                        <Tooltip title={"Number of private duplications"} placement={'top-start'}><span><DynamicFeedIcon />: {counterDup}</span></Tooltip>
                        <Tooltip title={"Number of card within collection"} placement={'top-start'}><span><CollectionIcon />: {cardNum}</span></Tooltip>
                    </div>
                </div>
                <CardActions style={{ backgroundColor: "rgba(255, 255, 255, 0.55)", borderRadius: "1em", display: "flex", flexDirection: "column", alignItems: "inherit" }}>
                    <ButtonGroup orientation='horizontal' style={{ marginBlock: "4px" }}>
                        <Button variant='contained' color='primary' size='large' onClick={clickF} >Enter</Button>
                        {getBtnDuplicateByType(type)}
                    </ButtonGroup>
                    {type === "private" && (
                        <>
                            <ButtonGroup orientation='horizontal'>
                                <Button onClick={() => openEditModal(collection)}>Edit <EditIcon /></Button>
                                <Button onClick={deleteCollection}>Delete<DeleteForeverIcon /></Button>
                            </ButtonGroup>
                        </>
                    )}
                    {type === "public" && (
                        <ButtonGroup orientation='horizontal'>
                            {
                                !isOwned && (isFaved ?
                                    <Button onClick={unfavCollection}>Remove from favs <FavoriteIcon htmlColor='red' /></Button> :
                                    <Button onClick={favCollection}>Add to Favs<FavoriteIcon htmlColor='darkgray' /></Button>)
                            }
                        </ButtonGroup>
                    )}
                    {type === "favourite" && (
                        <ButtonGroup orientation='horizontal'>
                            <Button onClick={unfavCollection}>Remove from favs <FavoriteIcon htmlColor='red' /></Button>
                        </ButtonGroup>
                    )}
                </CardActions>

            </CardContent>
        </Card >
    )
};

Collection.propTypes = {
    collection: PropTypes.shape({
        cardNum: PropTypes.number,
        category: PropTypes.string,
        collectionColor: PropTypes.string,
        counterDup: PropTypes.number,
        counterFav: PropTypes.number,
        id: PropTypes.number,
        owner: PropTypes.string,
        title: PropTypes.string,
        visibility: PropTypes.string
    }),
    isFaved: PropTypes.bool,
    isOwned: PropTypes.bool,
    openEditModal: PropTypes.func,
    refreshCollectionsCallback: PropTypes.func,
    type: PropTypes.string
}
export default React.memo(Collection);