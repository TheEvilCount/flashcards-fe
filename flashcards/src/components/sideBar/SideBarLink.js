import PropTypes from "prop-types"
import React from "react";
import { NavLink } from "react-router-dom";
import { pathConsts } from "../../config/paths";
import SubNavLink from "./SubNavLink";

import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import InventoryIcon from '@mui/icons-material/Inventory';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { MenuItem } from "@mui/material";

import { Menu } from "react-pro-sidebar";
import MySubMenu from "./MySubMenu";

const SideBarLink = ({ route, auth, collapsed }) =>
{
    const isAdmin = auth?.user?.admin;
    if (route.isAdmin && !isAdmin) return <></>;

    const subMenuItems = [
        {
            title: "My",
            icon: InventoryIcon,
            to: pathConsts.collectionsMy,
            key: "my",
        }, {
            title: "Explore",
            icon: ExploreIcon,
            to: pathConsts.collectionsExplore,
            key: "explore",
        }, {
            title: "Top",
            icon: FilterListIcon,
            to: pathConsts.collectionsTop,
            key: "top",
        }, {
            title: "Favourite",
            icon: FavoriteIcon,
            to: pathConsts.collectionsFav,
            key: "fav",
        },
    ]

    const isSubMenu = !collapsed;

    const sideBarCollections = (withTitle) =>
    {
        return subMenuItems.map((item) =>
        {
            return (
                <MenuItem key={item.key} style={{ paddingBlock: "0", marginBlock: "0" }}>
                    <SubNavLink to={item.to} Icon={item.icon} title={withTitle ? item.title : ""} />
                </MenuItem>
            )
        })
    }

    return (
        <>
            <MenuItem icon={collapsed ? route.Icon : undefined}>
                <div className={route.class} key={("nav-li_" + route.key)}>
                    <NavLink exact activeClassName="active" to={route.path} style={{ color: "white" }}>{!collapsed ? <route.Title /> : route.Icon}</NavLink>
                </div>
            </MenuItem>

            {
                route.path === pathConsts.dashboard && auth.isLogged &&
                (
                    collapsed ?
                        (
                            isSubMenu ?
                                (<MySubMenu
                                    icon={<CollectionsBookmarkIcon htmlColor="white" />} title={"Collections"} open={!collapsed}
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
                                icon={<CollectionsBookmarkIcon htmlColor="white" />} title={"Collections"} style={{ padding: "0", margin: "0" }}>
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

SideBarLink.propTypes = {
    auth: PropTypes.shape({
        isLogged: PropTypes.any,
        user: PropTypes.shape({
            admin: PropTypes.any
        })
    }),
    collapsed: PropTypes.bool,
    route: PropTypes.shape({
        Icon: PropTypes.any,
        Title: PropTypes.any,
        class: PropTypes.any,
        isAdmin: PropTypes.any,
        key: PropTypes.any,
        path: PropTypes.any
    })
}
export default React.memo(SideBarLink);
