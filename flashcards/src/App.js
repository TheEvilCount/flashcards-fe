//import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter, Route, Switch, NavLink, Redirect } from "react-router-dom";

import routes from "./config/routes.js";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, logoutAction } from "./actions"

export default function App()
{
  const counter = useSelector(state => state.counter);
  const userReducer = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <div>
        <div className="header">
          <ul>
            {
              routes.map((route) => (
                route.title && (<li key={("nav-li_" + route.key)}><NavLink exact activeClassName="active" to={route.path}>{route.title}</NavLink></li>)
              ))
            }
            <li>Counter: {counter}</li>
            <li><button onClick={() => dispatch(increment())}>counter +</button></li>
            <li><button onClick={() => dispatch(decrement())}>counter -</button></li>
            {userReducer.isLogged && <li><button onClick={() => (logoutAction(dispatch))}>Logout</button></li>}
            {userReducer.isLogged && (<li>Hello user {userReducer.user.username}</li>)}
          </ul>
        </div>

        <div className="content">
          <Switch>
            {
              routes.map((route) => (
                <Route
                  exact
                  key={("r_" + route.key)}
                  path={route.path}
                >
                  {route.isPrivate && !userReducer.isLogged ? (<Redirect to="/login" />) : (<route.comp />)}
                </Route>
              ))
            }
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}