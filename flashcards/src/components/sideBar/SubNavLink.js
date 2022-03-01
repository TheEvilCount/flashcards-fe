import React from "react";
import { NavLink } from "react-router-dom";


const SubNavLink = ({ to, title, Icon }) =>
{
    return (
        <NavLink className="submenu-item" exact activeClassName="active" to={to}>
            {Icon && <div className="icon inner"><Icon /></div>}
            <div className="title inner">
                {title}
            </div>
        </NavLink>
    )
};
export default React.memo(SubNavLink);