import React from "react";
import { FaCalendar } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const SubNavLink = ({ to, title, Icon }) =>
{
    return (
        <li>
            <NavLink className="submenu-item" exact activeClassName="active" to={to}>
                {Icon && <div className="icon"><Icon /></div>}
                <div className="title">
                    {title}
                </div>
            </NavLink>
        </li>
    )
};
export default React.memo(SubNavLink);