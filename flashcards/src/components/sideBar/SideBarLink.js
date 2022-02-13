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
import MySubMenu from "./MySubMenu";

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

    const subMenuItems = [
        {
            title: "My collections",
            icon: InventoryIcon,
            to: pathConsts.collectionsMy,
            key: "my",
        }, {
            title: "explore",
            icon: ExploreIcon,
            to: pathConsts.collectionsExplore,
            key: "explore",
        }, {
            title: "Top collections",
            icon: FilterListIcon,
            to: pathConsts.collectionsTop,
            key: "top",
        }, {
            title: "Favourite collections",
            icon: FavoriteIcon,
            to: pathConsts.collectionsFav,
            key: "fav",
        },
    ]

    const isSubMenu = true;

    const sideBarCollections = (withTitle) =>
    {
        return subMenuItems.map((item) =>
        {
            return (
                <MenuItem style={{ paddingBlock: "0", marginBlock: "0" }}>
                    <SubNavLink key={item.key} to={item.to} Icon={item.icon} title={withTitle ? item.title : ""} />
                </MenuItem>
            )
        })
    }

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
                    collapsed ?
                        (
                            isSubMenu ?
                                (<MySubMenu
                                    icon={<CollectionsBookmarkIcon />} title={"Collections"} open={!collapsed}
                                    style={{ padding: "0", margin: "0" }}
                                >
                                    {sideBarCollections(true)}
                                </MySubMenu>)
                                :
                                (<Menu>
                                    {sideBarCollections(false)}
                                </Menu>)
                        )
                        :
                        (
                            <MySubMenu
                                icon={<CollectionsBookmarkIcon />} title={"Collections"} style={{ padding: "0", margin: "0" }}>
                                {
                                    sideBarCollections(true)
                                }
                            </MySubMenu >
                        )
                )
            }

        </>
    )
}
export default React.memo(SideBarLink);
