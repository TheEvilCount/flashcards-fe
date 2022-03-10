import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

const SubNavLink = ({ to, title, Icon }) =>
{
    return (
        <NavLink className="submenu-item" exact activeClassName="active" to={to}>
            {Icon && (
                <div className="icon inner">
                    <Icon />
                </div>
            )}
            <div className="title inner">{title}</div>
        </NavLink>
    );
};

SubNavLink.propTypes = {
    Icon: PropTypes.any,
    title: PropTypes.string,
    to: PropTypes.any
}

export default React.memo(SubNavLink);
