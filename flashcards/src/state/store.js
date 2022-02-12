
import { combineReducers, applyMiddleware, createStore } from "redux";
import ReduxThunk from 'redux-thunk';
import { connectRouter } from 'connected-react-router'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from "redux-devtools-extension";

import { createHashHistory } from "history";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { registerReducer } from "./reducers/registerReducer";
import { loggedReducer } from "./reducers/authReducer";



export const history = createHashHistory(/*{ basename: BASE_URL_RELATIVE_PATH }*/)

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"]
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(
    {
      router: connectRouter(history),
      auth: loggedReducer,
      register: registerReducer
    }
  )
);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), ReduxThunk),
  ),
);

export default function configureAppStore()
{
  let persistor = persistStore(store);
  return { store, persistor };
}