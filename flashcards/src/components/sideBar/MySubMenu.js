import React, { useState } from 'react'
import { SubMenu } from 'react-pro-sidebar';

const MySubMenu = ({ children, title, style, icon, ...p }) =>
{
    const [isOpen, setIsOpen] = useState(true);
    return (
        <SubMenu icon={icon} title={title} style={style} open={isOpen} onClick={() => setIsOpen(!isOpen)}>
            {children}
        </SubMenu >
    )
}

export default MySubMenu;