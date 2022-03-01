import React from 'react'
import routes from "../../config/routes.js";
import { pathConsts } from "../../config/paths";
import { logoutAction } from "../../state/actions";
import SideBarLink from './SideBarLink.js';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { IconButton } from '@mui/material';


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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: collapsed ? "center" : 'flex-end'
                    }}>
                        <IconButton className="btn-toggle" onClick={() => handleToggleSideBar(!collapsed)}>
                            {collapsed ? <MenuIcon htmlColor='white' /> : <ChevronLeftIcon htmlColor='white' />}
                        </IconButton>
                    </div>
                </div>
                <Menu className='header-brand'>
                    <SideBarLink key={home.key} route={home} auth={authReducer} collapsed={collapsed} />
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
}
export default React.memo(SideBar)

