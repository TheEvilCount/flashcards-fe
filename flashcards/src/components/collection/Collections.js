import PropTypes from "prop-types"
import { Alert } from '@mui/material';
import React, { useMemo } from 'react';
import Collection from './Collection';
import { useSelector } from "react-redux";
import selectors from "state/selectors/authSelectors";

const Collections = ({ collections = [], displayType, refreshCollectionsCallback, openEditModal, favsIds }) =>
{
    const username = useSelector(selectors.getLoggedUserUsername);

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
                    isOwned={(c.owner === username)}
                    refreshCollectionsCallback={refreshCollectionsCallback}
                    openEditModal={openEditModal} />
            )
        })
    }, [collections, displayType, refreshCollectionsCallback, openEditModal, favsIds, username]);

    return (
        <div>
            <div className="collection-wrapper">
                {memoizedCollections}
            </div>
        </div>
    )
};

Collections.propTypes = {
    collections: PropTypes.array,
    displayType: PropTypes.string,
    favsIds: PropTypes.array,
    openEditModal: PropTypes.func,
    refreshCollectionsCallback: PropTypes.func
}
export default React.memo(Collections)