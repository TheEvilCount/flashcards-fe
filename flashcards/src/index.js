import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from "./state/store";
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline } from '@mui/material';

import { ConfirmProvider } from 'material-ui-confirm';

import { ReactQueryDevtools } from 'react-query/devtools'

import axios from 'axios';
import { responseInterceptorError, responseInterceptorResponse, useTimeout } from './config/axiosInterceptors';


//remove console.* from production build
if (process.env.NODE_ENV === 'production')
{
  console.log = () => { }
  //console.error = () => { }
  //console.warn = () => { }
  console.debug = () => { }
}

const { store, persistor } = configureStore();

const queryClient = new QueryClient({

  defaultOptions: {
    queries: {
      // query options
      onError: (err) =>
      {
        console.error("Error query: " + err.message);
      },
      cacheTime: (1000 * 60 * 5),//cache time 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      // mutation options
      onError: (err) =>
      {
        console.error("Error muation: " + err.message);
      }
    },
  },
});

// Request interceptors
axios.interceptors.request.use(useTimeout);

// Response interceptors
axios.interceptors.response.use(
  (response) =>
  {
    return responseInterceptorResponse(response);
  },
  (error) =>
  {
    return responseInterceptorError(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={"colored"}
          />
          <ConfirmProvider
            defaultOptions={{
              confirmationButtonProps: { autoFocus: true },
              cancellationText: "Cancel",
              confirmationText: "Ok"
            }}
          >
            <App />
          </ConfirmProvider>
          <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
