import PropTypes from "prop-types"
import React, { useState } from 'react'
import { SubMenu } from 'react-pro-sidebar';

const MySubMenu = ({ children, title, style, icon, ...props }) =>
{
    const [isOpen, setIsOpen] = useState(true);
    return (
        <SubMenu icon={icon} title={title} style={style} open={isOpen} onClick={() => setIsOpen(!isOpen)} {...props}>
            {children}
        </SubMenu >
    )
}

MySubMenu.propTypes = {
    children: PropTypes.any,
    icon: PropTypes.any,
    style: PropTypes.any,
    title: PropTypes.string
}

export default MySubMenu;