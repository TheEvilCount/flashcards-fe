//import logo from './logo.svg';
import './App.scss';

import React, { useState } from 'react';
import { /* Router, */ Route, Switch, NavLink, Redirect } from "react-router-dom";
import { ConnectedRouter as Router } from 'connected-react-router';
import { ErrorBoundary } from 'react-error-boundary'

import routes from "./config/routes.js";
import { pathConsts } from "./config/paths";

import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "./actions";
import axios from 'axios';

import SideBar from './components/sideBar/SideBar';
import ContentWrapper from './components/ContentWrapper';
import { history } from './state/store';
import { Collapse } from '@material-ui/core';


export default function App(props)
{
  const authReducer = useSelector(state => state.auth);
  const dispatch = useDispatch();

  //logout when unauthorize status appears//TODO check if working
  axios.interceptors.response.use(
    (response) =>
    {
      return response;
    },
    (error) =>
    {
      if (error?.response?.status === 401)
      {
        dispatch(logoutAction());//TODO or revoke login
      }
      return error;
    },
  );



  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const handleToggleSideBar = (what) =>
  {
    setSideBarCollapsed(what);
  }

  return (
    <Router history={history}>

      <SideBar auth={authReducer} collapsed={sideBarCollapsed} handleToggleSideBar={handleToggleSideBar} />

      <div id="content" className='content'>
        <Switch>
          {
            routes.map((route) => (
              <Route exact key={("r_" + route.key)} path={route.path}>
                {
                  route.isPrivate && !authReducer.isLogged ?
                    (<Redirect to={pathConsts.login} />)
                    :
                    (
                      ((authReducer.isLogged && route.path === pathConsts.login) || (route?.isAdmin && !authReducer.user.admin)) ?
                        <Redirect to={pathConsts.dashboard} />
                        :
                        (

                          <ErrorBoundary
                            fallbackRender={({ error, resetErrorBoundary }) => (
                              <div role="alert" style={{ margin: "auto", marginTop: "10vh" }}>
                                <div>Nastala chyba!</div>
                                <pre>{error.message}</pre>
                                <button
                                  onClick={() =>
                                  {
                                    // this next line is why the fallbackRender is useful
                                    //TODO resetComponentState()
                                    // though you could accomplish this with a combination
                                    // of the FallbackCallback and onReset props as well.
                                    resetErrorBoundary()
                                  }}
                                >
                                  Zkusit znovu...
                                </button>
                              </div>
                            )}>
                            <ContentWrapper>
                              <route.comp />
                            </ContentWrapper>
                          </ErrorBoundary>
                        )
                    )
                }
              </Route>
            ))
          }
        </Switch>
      </div>
    </Router >
  )
}