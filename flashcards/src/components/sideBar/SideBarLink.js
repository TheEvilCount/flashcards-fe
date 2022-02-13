import React from "react";
import { NavLink } from "react-router-dom";
import { pathConsts } from "../../config/paths";
import SubNavLink from "./SubNavLink";

import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import InventoryIcon from '@mui/icons-material/Inventory';

const SideBarLink = ({ route, auth }) =>
{
    const isAdmin = auth?.user?.admin;
    if (route.isAdmin && !isAdmin) return;

    return (
        <>
            <li className={route.class} key={("nav-li_" + route.key)}>
                <NavLink exact activeClassName="active" to={route.path}><route.Title /></NavLink>
            </li>
            {
                route.path === pathConsts.dashboard && auth.isLogged &&
                (
                    <div className="submenu">
                        <SubNavLink key={"my"} to={pathConsts.collectionsMy} Icon={InventoryIcon} title={"My collections"} />
                        <SubNavLink key={"explore"} to={pathConsts.collectionsExplore} Icon={ExploreIcon} title={"Explore collections"} />
                        <SubNavLink key={"top"} to={pathConsts.collectionsTop} Icon={FilterListIcon} title={"Top collections"} />
                        <SubNavLink key={"fav"} to={pathConsts.collectionsFav} Icon={FavoriteIcon} title={"Favourite collections"} />
                    </div>
                )
            }
        </>
    )
}
export default React.memo(SideBarLink);