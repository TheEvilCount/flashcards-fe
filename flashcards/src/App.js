//import logo from './logo.svg';
import './App.css';

import React from 'react';
import { Router, Route, Switch, NavLink, Redirect } from "react-router-dom";

import routes from "./config/routes.js";
import { pathConsts } from "./config/paths";

import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "./actions";
import axios from 'axios';


import { history } from "./helpers/history";

import { FaSignOutAlt } from "react-icons/fa";

export default function App(props)
{
  const authReducer = useSelector(state => state.auth);
  const dispatch = useDispatch();

  //logout when unauthorize status appears
  axios.interceptors.response.use(
    (response) =>
    {
      return response;
    },
    (error) =>
    {
      if (error.response.status === 401)
      {
        logoutAction(dispatch);
      }
      return error;
    },
  );


  return (
    <Router history={history}>
      <div>
        <div className="header">
          <ul>
            {authReducer.isLogged && <li className="fRight"><a onClick={() => (logoutAction(dispatch))}>Logout <FaSignOutAlt /></a></li>}

            {
              routes.map((route) => (
                (!authReducer.isLogged) ?

                  (route.show && route.showWhenNotLogged &&
                    <li className={route.class} key={("nav-li_" + route.key)}>
                      <NavLink exact activeClassName="active" to={route.path}>{<route.Title />}</NavLink>
                    </li>)
                  :
                  (
                    !(route.path === pathConsts.register || route.path === pathConsts.login) && route.show &&
                    (<li className={route.class} key={("nav-li_" + route.key)}>
                      <NavLink exact activeClassName="active" to={route.path}><route.Title /></NavLink>
                    </li>)
                  )
              ))
            }
          </ul>
        </div>

        <div className="content">
          <Switch>
            {
              routes.map((route) => (
                <Route exact key={("r_" + route.key)} path={route.path}>
                  {route.isPrivate && !authReducer.isLogged ?
                    (<Redirect to={pathConsts.login} />)
                    :
                    ((authReducer.isLogged && route.path === pathConsts.login) ?
                      <Redirect to={pathConsts.dashboard} />
                      :
                      <route.comp />)}
                </Route>
              ))
            }
          </Switch>
        </div>
      </div>
    </Router>
  )
}