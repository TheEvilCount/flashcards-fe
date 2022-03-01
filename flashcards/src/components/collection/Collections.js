import { Alert } from '@mui/material';
import React, { useMemo } from 'react';
import Collection from './Collection';

const Collections = ({ collections, displayType, refreshCollectionsCallback, openEditModal, favsIds }) =>
{
    const isInFavs = (id, favs) =>
    {
        if (favs?.includes(id))
            return true;
        return false;
    }

    const memoizedCollections = useMemo(() =>
    {
        if (!collections || collections.length === 0) return (<Alert severity='info'>No collection found</Alert>)
        return collections?.map((c, index) =>
        {
            return (
                <Collection key={"coll" + index}
                    collection={c}
                    type={displayType}
                    isFaved={isInFavs(c.id, favsIds)}
                    refreshCollectionsCallback={refreshCollectionsCallback}
                    openEditModal={openEditModal} />
            )
        })
    }, [collections, displayType, refreshCollectionsCallback, openEditModal, favsIds]);

    return (
        <div>
            <div className="collection-wrapper">
                {memoizedCollections}
            </div>
        </div>
    )
};
export default React.memo(Collections)