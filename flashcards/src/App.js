import './App.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter as Router, push } from 'connected-react-router';
import { ErrorBoundary } from 'react-error-boundary'

import routes from "./config/routes.js";
import { pathConsts } from "./config/paths";
import { history } from './state/store';

import SideBar from './components/sideBar/SideBar';

import CookieConsent from "react-cookie-consent";
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';

export default function App()
{
  const authReducer = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

  const matches = useIsMobile();

  useEffect(() =>
  {
    setSideBarCollapsed(matches);
  }, [matches]);

  const handleToggleSideBar = (what) =>
  {
    setSideBarCollapsed(what);
  }

  return (
    <Router history={history}>

      <SideBar auth={authReducer} collapsed={sideBarCollapsed} handleToggleSideBar={handleToggleSideBar} />
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
                          <route.comp />
                        </ErrorBoundary>
                      )
                  )
              }
            </Route>
          ))
        }
      </Switch>
      <CookieConsent
        location={"bottom"}
        buttonText={"I understand."}
        cookieName={"cookieConsent"}
        style={{ background: "#2B373B", zIndex: "2000" }}
        buttonStyle={{ color: "#4e503b", fontSize: "1.2em", borderRadius: "10px" }}
        ButtonComponent={Button}
        customButtonProps={{ color: "primary" }}
        expires={666}
        overlay={false}
        /* debug={true} */
        /* acceptOnScroll={true}
        acceptOnScrollPercentage={50} */
        onAccept={() =>
        {
          toast.info("Cookie consent given.");
        }}
      >
        This website uses session cookies necessary for application functions.
        More at
        <a className='nav-link' onClick={() =>
        {
          dispatch(push(pathConsts.about));
          setTimeout(() =>
          {
            const node = document.getElementById('cpolicy');
            node.scrollIntoView({ behavior: "smooth" });
          }, 0);
        }}
        >
          Cookies Policy
        </a>.
        <br />
        <small>
          By using our website, you agree to our
          <a className='nav-link' onClick={() =>
          {
            dispatch(push(pathConsts.about));
            setTimeout(() =>
            {
              const node = document.getElementById('ppolicy');
              node.scrollIntoView({ behavior: "smooth" });
            }, 0);
          }}
          >
            Privacy Policy
          </a>
          and our cookies usage.
        </small>
      </CookieConsent>
    </Router >
  )
}