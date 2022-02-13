import React, { useMemo } from 'react';
import Collection from './Collection';

import CircularProgress from '@mui/material/CircularProgress';

const Collections = ({ collections, isLoading, error, displayType }) =>
{

    const memoizedCollections = useMemo(() =>
    {
        return collections?.map((c, index) =>
        {
            return (
                <Collection key={"coll" + index} collection={c} type={displayType} />
            )
        })
    }, [collections]);

    return (
        <div>
            <div>{"loading: " + isLoading}</div>
            <div>{"error: " + error}</div>
            <div>{"dt: " + displayType}</div>
            <div className="collection-wrapper">

                {isLoading ?
                    <CircularProgress />
                    :
                    memoizedCollections?.map((i) => { return i; }) || <>No collection found</>
                }
            </div>
        </div>
    )
};
export default React.memo(Collections)