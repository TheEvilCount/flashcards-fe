import React, { useMemo } from 'react';
import { collectionDisplayTypes } from '../../pages/CollectionsPage';
import Collection from './Collection';

const Collections = ({ collections, displayType, refreshCollectionsCallback, openEditModal, favs }) =>
{
    const isInFavs = (id) =>
    {
        if (favs?.includes(id))
            return true;
        return false;
    }

    const memoizedCollections = useMemo(() =>
    {
        return collections?.map((c, index) =>
        {
            return (
                <Collection key={"coll" + index} collection={c} type={displayType}
                    isFaved={displayType === collectionDisplayTypes.public ? isInFavs(c.id) : false}
                    refreshCollectionsCallback={refreshCollectionsCallback} openEditModal={openEditModal} />
            )
        })
    }, [collections, displayType]);

    return (
        <div>
            {/* <div>{"dt: " + displayType}</div> */}
            <div className="collection-wrapper">
                {
                    memoizedCollections?.map((i) => { return i; }) || <>No collection found</>
                }
            </div>
        </div>
    )
};
export default React.memo(Collections)