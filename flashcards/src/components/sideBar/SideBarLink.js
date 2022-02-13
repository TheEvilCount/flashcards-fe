import React from "react";
import { NavLink, Route } from "react-router-dom";
import { pathConsts } from "../../config/paths";
import SubNavLink from "./SubNavLink";

import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import InventoryIcon from '@mui/icons-material/Inventory';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

import { MenuItem } from "@material-ui/core";
import { Menu, SubMenu } from "react-pro-sidebar";

const SideBarLink = ({ route, auth, collapsed }) =>
{
    const isAdmin = auth?.user?.admin;
    if (route.isAdmin && !isAdmin) return;

    /* return (
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
    ) */

    return (
        <>
            <MenuItem icon={collapsed ? route.Icon : undefined}>
                <div className={route.class} key={("nav-li_" + route.key)}>
                    <NavLink exact activeClassName="active" to={route.path}>{!collapsed ? <route.Title /> : route.Icon}</NavLink>
                </div>
            </MenuItem>
            {
                route.path === pathConsts.dashboard && auth.isLogged &&
                (
                    <SubMenu icon={<CollectionsBookmarkIcon />} title={"Collections"} open={!collapsed} style={{ padding: "0", margin: "0" }}>
                        <MenuItem style={{ paddingBlock: "0", marginBlock: "0" }}>
                            <SubNavLink key={"my"} to={pathConsts.collectionsMy} Icon={InventoryIcon} title={"My collections"} />
                        </MenuItem>
                        <MenuItem style={{ paddingBlock: "0", marginBlock: "0" }}>
                            <SubNavLink key={"explore"} to={pathConsts.collectionsExplore} Icon={ExploreIcon} title={"Explore collections"} />
                        </MenuItem>
                        <MenuItem style={{ paddingBlock: "0", marginBlock: "0" }}>
                            <SubNavLink key={"top"} to={pathConsts.collectionsTop} Icon={FilterListIcon} title={"Top collections"} />
                        </MenuItem>
                        <MenuItem style={{ paddingBlock: "0", marginBlock: "0" }}>
                            <SubNavLink key={"fav"} to={pathConsts.collectionsFav} Icon={FavoriteIcon} title={"Favourite collections"} />
                        </MenuItem>
                    </SubMenu >
                )
            }
        </>
    )
}
export default React.memo(SideBarLink);
