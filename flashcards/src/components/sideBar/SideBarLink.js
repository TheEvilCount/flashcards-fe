import React from "react";
import { NavLink } from "react-router-dom";
import { pathConsts } from "../../config/paths";
import SubNavLink from "./SubNavLink";

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
                        <SubNavLink key={"my"} to={"/collections?q=my"} title={"My collections"} />
                        <SubNavLink key={"explore"} to={"/collections?q=explore"} title={"Explore collections"} />
                        <SubNavLink key={"top"} to={"/collections?q=top"} title={"Top collections"} />
                        <SubNavLink key={"sub"} to={"/collections?q=sub"} title={"Favourite collections"} />
                    </div>
                )
            }
        </>
    )
}
export default React.memo(SideBarLink);