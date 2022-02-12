import React from "react";
import { NavLink } from "react-router-dom";


const SubNavLink = ({ to, title }) =>
{
    return (
        <li>
            <NavLink className="submenu-item" activeClassName="active" to={to}>
                <div className="title">
                    {title}
                </div>
            </NavLink>
        </li>
    )
};
export default React.memo(SubNavLink);