import React, { useState } from 'react'
import routes from "../../config/routes.js";
import { pathConsts } from "../../config/paths";
import { logoutAction } from "../../actions";
import SideBarLink from './SideBarLink.js';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Collapse } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Button } from '@mui/material';
/* import 'react-pro-sidebar/dist/css/styles.css'; */


function SideBar({ auth, collapsed, handleToggleSideBar })
{
    const authReducer = auth;
    const dispatch = useDispatch();
    const home = routes.filter((r) => { return r.path === pathConsts.home })[0]
    return (
        <ProSidebar id='sidebar'
            collapsed={collapsed}
            style={{ height: "100vh" }}
        >
            <SidebarHeader>
                <div className='sidebar-toggle'>
                    <Button className="btn-toggle" onClick={() => handleToggleSideBar(!collapsed)}>
                        {collapsed ? <MenuIcon htmlColor='white' /> : <CloseIcon htmlColor='white' />}
                    </Button>
                </div>
                <Menu className='header-brand'>
                    <MenuItem icon={collapsed ? home.Icon : undefined} style={{ padding: "0" }}>
                        <SideBarLink key={home.key} route={home} auth={authReducer} />
                    </MenuItem>
                </Menu>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">
                    {
                        routes.map((route) => (
                            (
                                route.show &&
                                (
                                    (!authReducer.isLogged) ?

                                        (route.showWhenNotLogged &&
                                            <SideBarLink key={route.key} route={route} auth={authReducer} collapsed={collapsed} />
                                        )
                                        :
                                        (
                                            !(route.path === pathConsts.register || route.path === pathConsts.login) &&
                                            (
                                                <SideBarLink key={route.key} route={route} auth={authReducer} collapsed={collapsed} />
                                            )
                                        )
                                )
                            )
                        ))
                    }
                </Menu >
            </SidebarContent >
            <SidebarFooter>
                {authReducer.isLogged &&
                    <Menu>
                        <MenuItem icon={collapsed ? <PowerSettingsNewIcon /> : undefined} className={"logout"} onClick={() => (dispatch(logoutAction()))}>
                            <NavLink exact activeClassName="active" to={"/login"}>
                                {!collapsed &&
                                    <>
                                        <div className="icon inner" ><PowerSettingsNewIcon /></div>
                                        <div className="title inner">Logout</div>
                                    </>
                                }
                            </NavLink>
                        </MenuItem>
                    </Menu>
                }
            </SidebarFooter>
        </ProSidebar >
    )

    return (
        <div className="sidebar">
            <Collapse orientation="horizontal" in={collapsed} collapsedSize={40} style={{ height: "100%", position: "fixed", zIndex: "100", backgroundColor: "#333", width: "200px" }}>
                <nav id="sidebar">
                    <div id="close-sidebar" onClick={() => handleToggleSideBar(!collapsed)}>
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

