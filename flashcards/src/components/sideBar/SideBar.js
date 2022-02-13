import React, { useState } from 'react'
import routes from "../../config/routes.js";
import { pathConsts } from "../../config/paths";
import { logoutAction } from "../../actions";
import SideBarLink from './SideBarLink.js';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import MenuIcon from '@mui/icons-material/Menu';
import { Collapse } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';


function SideBar({ auth, children })
{
    const authReducer = auth;
    const dispatch = useDispatch();


    const [isSideBarMinimized, setIsSideBarMinimized] = useState(false);

    return (
        <div className="sidebar">

            <Collapse orientation="horizontal" in={isSideBarMinimized} collapsedSize={40} style={{ height: "100%", position: "fixed", zIndex: "100", backgroundColor: "#333", width: "200px" }}>
                <nav id="sidebar" className="header">
                    <div id="close-sidebar" onClick={() => setIsSideBarMinimized(!isSideBarMinimized)}>
                        <MenuIcon htmlColor='white' />
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
                        {authReducer.isLogged &&
                            <li className={"logout"} key={("nav-li_logout")} onClick={() => (dispatch(logoutAction()))}>
                                <NavLink exact activeClassName="active" to={"/login"}>
                                    <div className="icon" ><PowerSettingsNewIcon /></div>
                                    <div className="title">Logout</div>
                                </NavLink>
                            </li>
                        }
                    </ul>
                </nav>
            </Collapse>
        </div >


    )
}
export default React.memo(SideBar)

