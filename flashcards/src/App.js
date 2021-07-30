//import logo from './logo.svg';
import './App.scss';

import React from 'react';
import { Router, Route, Switch, NavLink, Redirect } from "react-router-dom";

import routes from "./config/routes.js";
import { pathConsts } from "./config/paths";

import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "./actions";
import axios from 'axios';
import { history } from "./helpers/history";

import SideBar from './components/sideBar/SideBar';

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
      <SideBar auth={authReducer} dispatch={dispatch} />
      <div id="content">
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
    </Router >
  )
}