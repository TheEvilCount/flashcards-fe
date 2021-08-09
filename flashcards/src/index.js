import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from "./helpers/store";

const { store, persistor } = configureStore();
/*
//action increment
const increment = () =>
{
  return {
    type: "INCREMENT"
  }
}
//action decrement
const decrement = () =>
{
  return {
    type: "DECREMENT"
  }
}

//REDUCER
const counter = (state = 0, action) =>
{
  switch (action.type)
  {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

let store1 = createStore(counter);

//display it in the console
store1.subscribe(() => console.log(store1.getState()));

//DISPATCH
store1.dispatch(increment());
store1.dispatch(increment());
store1.dispatch(increment());
store1.dispatch(decrement());
*/
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
