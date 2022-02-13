import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CardList from '../cards/CardList';
import collectionsAPI from '../../api/cards/collectionsAPI';
import Collection from './Collection';
import useAxios from 'axios-hooks';
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import useApi from '../../hooks/useApi';
import Collections from './Collections';
import { Button } from '@material-ui/core';
import { goBack } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';

const CollectionsPage = (props) =>
{
    const { type } = useParams();
    const [search, setSearch] = useState("");

    const getCollectionsRequest = (type) =>
    {
        if (type === "my") return collectionsAPI.getCollections.private(1, 30);
        if (type === "explore") return collectionsAPI.discoverCollections(search, 1, 30);
        if (type === "top") return collectionsAPI.getCollections.public(1, 30);
        if (type === "favourite") return collectionsAPI.getCollections.favourite(1, 30);

        return null;
    }

    const getType = (type) =>
    {
        if (type === "my") return "private";
        if (type === "explore") return "public";
        if (type === "top") return "public";
        if (type === "favourite") return "favourite";
        return "private";
    }

    const [{ data: collsData, isLoading: collsIsLoading, error: collsError }, getCollections] = useAxios(
        getCollectionsRequest(type || null), { manual: true }
    );

    useEffect(() =>
    {
        getCollections();
    }, [getCollections, type]);


    const dispatch = useDispatch();

    return (
        <>
            <h2>Collections - {type}</h2>
            <Button variant='contained' onClick={() => { dispatch(goBack()) }}>Go back</Button>
            {type === "explore" && <TextField color='primary' label={"Search:"} onChange={(e) => { setSearch(e.target.value) }} value={search} />}
            <Collections collections={collsData} isLoading={collsIsLoading} error={collsError} displayType={getType(type)} />
        </>
    )
};
export default React.memo(CollectionsPage)