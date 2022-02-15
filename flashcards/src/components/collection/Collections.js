import React, { useMemo } from 'react';
import Collection from './Collection';

const Collections = ({ collections, displayType }) =>
{

    const memoizedCollections = useMemo(() =>
    {
        return collections?.map((c, index) =>
        {
            return (
                <Collection key={"coll" + index} collection={c} type={displayType} />
            )
        })
    }, [collections, displayType]);

    return (
        <div>
            <div>{"dt: " + displayType}</div>
            <div className="collection-wrapper">
                {
                    memoizedCollections?.map((i) => { return i; }) || <>No collection found</>
                }
            </div>
        </div>
    )
};
export default React.memo(Collections)