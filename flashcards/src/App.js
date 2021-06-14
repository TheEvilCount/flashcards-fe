//import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter, Route, Switch, NavLink, Redirect } from "react-router-dom";

import routes from "./config/routes.js";

export default function App()
{

  return (
    <BrowserRouter>
      <div>
        <div className="header">
          <ul>
            {
              routes.map((route) => (
                route.title ? (<li><NavLink exact activeClassName="active" to={route.path} key={route.path}>{route.title}</NavLink></li>) : ("")
              ))
            }
            <li><p>Logout</p></li>
          </ul>
        </div>

        <div className="content">
          <Switch>
            {
              routes.map((route) => (
                <Route
                  exact
                  key={route.path}
                  path={route.path}
                >{route.isPrivate ? <Redirect to="/login" /> : <route.comp />}</Route>
              ))
            }
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}