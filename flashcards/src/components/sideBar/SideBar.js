import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

import routes from "../../config/routes.js";
import { pathConsts } from "../../config/paths";
import { logoutAction } from "../../actions";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SubNavLink from './SubNavLink.js';
import SideBarLink from './SideBarLink.js';

function SideBar(props)
{
    const authReducer = props.auth;
    const dispatch = props.dispatch;
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = function (toWhat)
    {
        setIsOpen(toWhat);
    };

    return (
        <div className="sidebar">
            {/*TODO show/hide side panel (content padding remove not working)*/
                !isOpen &&
                <div id="show-sidebar" className="btn btn-sm btn-dark" onClick={() => handleToggle(true)}>
                    <i className="fas fa-bars"></i>Open Sidebar
                </div>
            }
            {
                isOpen &&
                <nav id="sidebar" className="header">
                    <div id="close-sidebar" onClick={() => handleToggle(false)}>
                        <i className="fas fa-times"></i>Close Sidebar
                    </div>
                    <ul>
                        {
                            routes.map((route) => (
                                (
                                    route.show &&
                                    (
                                        (!authReducer.isLogged) ?

                                            (route.showWhenNotLogged &&

                                                <SideBarLink key={route.key} route={route} auth={authReducer} />
                                            )
                                            :
                                            (
                                                !(route.path === pathConsts.register || route.path === pathConsts.login) &&
                                                (
                                                    <SideBarLink key={route.key} route={route} auth={authReducer} />
                                                )
                                            )

                                    )
                                )
                            ))
                        }
                        {authReducer.isLogged && <li className="logout"><div className="li-item" onClick={() => (dispatch(logoutAction()))}><div className="icon" ><PowerSettingsNewIcon /></div><div className="title">Logout</div></div></li>}
                    </ul>
                </nav>
            }
        </div>
    )
}
export default React.memo(SideBar)

