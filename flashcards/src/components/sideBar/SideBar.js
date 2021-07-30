import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

import routes from "../../config/routes.js";
import { pathConsts } from "../../config/paths";
import { logoutAction } from "../../actions";

import { ExitToApp as ExitToAppIcon, PowerSettingsNew as PowerSettingsNewIcon } from '@material-ui/icons';

export default function SideBar(props)
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
                        <i class="fas fa-times"></i>Close Sidebar
                    </div>
                    <ul>
                        {
                            routes.map((route) => (
                                (
                                    route.show &&
                                    (
                                        (!authReducer.isLogged) ?

                                            (route.showWhenNotLogged &&

                                                <SideBarLink route={route} auth={authReducer} />
                                            )
                                            :
                                            (
                                                !(route.path === pathConsts.register || route.path === pathConsts.login) &&
                                                (
                                                    <SideBarLink route={route} auth={authReducer} />
                                                )
                                            )

                                    )
                                )
                            ))
                        }
                        {authReducer.isLogged && <li className="logout"><div className="li-item" onClick={() => (logoutAction(dispatch))}><div className="icon" ><PowerSettingsNewIcon /></div><div className="title">Logout</div></div></li>}
                    </ul>
                </nav>
            }
        </div>
    )
}

function SideBarLink(props)
{
    return (
        <>
            <li className={props.route.class} key={("nav-li_" + props.route.key)}>
                <NavLink exact activeClassName="active" to={props.route.path}><props.route.Title /></NavLink>
            </li>

            {
                props.route.path === pathConsts.dashboard && props.auth.isLogged &&
                (
                    <div className="submenu">
                        <li><NavLink key="my" className="submenu-item" activeClassName="active" to="/dashboard?cards=my"><div className="title"  /*onClick={() => {  window.location.hash = "myc";  }*/ >My cards</div></NavLink></li>
                        <li><NavLink key="explore" className="submenu-item" to="/dashboard?cards=explore"><div className="title" /*onClick={() => { window.location.hash = "exx"; }}*/>Explore cards</div></NavLink></li>
                        <li><NavLink key="top" className="submenu-item" to="/dashboard?cards=top"><div className="title"/*  onClick={() => { window.location.hash = "tpc"; }} */>Top cards</div></NavLink></li>
                        <li><NavLink key="sub" className="submenu-item" to="/dashboard?cards=sub"><div className="title" /* onClick={() => { window.location.hash = "sub"; }} */>submenu</div></NavLink></li>
                    </div>
                )
            }
        </>
    )
}
