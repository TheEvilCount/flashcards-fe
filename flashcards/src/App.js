//import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

import routes from "./config/routes.js";
import { AuthProvider } from "./components/context";
import AppRoutes from "./components/AppRoutes.js";

function App()
{

  return (
    < AuthProvider >
      <BrowserRouter>
        <div>
          <div className="header">
            <ul>
              <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
              <li><NavLink activeClassName="active" to="/dashboard">Dashboard <small>(Access with token only)</small></NavLink></li>
              <li><NavLink activeClassName="active" to="/login">Login <small>(Access without token only)</small></NavLink></li>
              <li><NavLink activeClassName="active" to="/register">Register <small>(Access without token only)</small></NavLink></li>
              <li><p>Logout</p></li>
            </ul>
          </div>

          <div className="content">
            <Switch>
              {
                routes.map((route) => (
                  <AppRoutes
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    isPrivate={route.isPrivate}
                  />
                ))
              }
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider >
  )
}
export default App;