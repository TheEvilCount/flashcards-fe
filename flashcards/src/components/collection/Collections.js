import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CardList from '../cards/CardList';
import collectionsAPI from '../../api/cards/collectionsAPI';
import Collection from './Collection';
import useAxios from 'axios-hooks';
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';

const Collections = (props) =>
{

    const search = useLocation().search;
    const colSP = new URLSearchParams(search).get("q");

    const [data, setdata] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const getCollectionsRequest = (searchParam) =>
    {
        if (searchParam === "my") return collectionsAPI.getCollections.private(1, 30);
        if (searchParam === "explore") return collectionsAPI.getCollections.public(1, 30);
        if (searchParam === "top") return collectionsAPI.getCollections.private(1, 30);

        return null;
    }

    useEffect(() =>
    {
        console.log(colSP)
    }, [colSP]);

    useEffect(() =>
    {
        console.log(data)
    }, [data]);

    const [req, setReq] = useState(getCollectionsRequest(colSP));
    //console.log(req)

    useEffect(() =>
    {
        setReq(getCollectionsRequest(colSP));
        return () =>
        {
            setReq(null);
        }
    }, [colSP])


    useEffect(() =>
    {
        if (req === null)
        {
            setdata([]);
            return;
        }
        setIsLoading(true);
        axios.request(req)
            .then(res => setdata(res.data))
            .catch(err => setError(err))
            .finally(e => setIsLoading(false));

        return () =>
        {
            setdata([]);
            setError("");
            setIsLoading(false);
        }
    }, [req])

    const memoizedCollections = useMemo(() =>
    {
        return data.map((c, index) =>
        {
            return (
                <Collection key={"coll" + index} collection={c} />
            )
        })
    }, [data]);

    return (
        <div>
            {/* {colSP}
            {console.log(collections)} */}
            <div>{"loading: " + isLoading}</div>
            <div>{"error: " + error}</div>
            {isLoading ?
                <CircularProgress />
                :
                memoizedCollections.map((i) => { return i; })
            }
        </div>
    )
};
export default React.memo(Collections)