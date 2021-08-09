
import { createStore } from "redux";

import allReducer from "./../reducers";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage: storage/*,
    whitelist: ["authReducer"]*/
};

const persistedReducer = persistReducer(
    persistConfig,
    allReducer
);

//const middlewares = [thunk];

export default function configureStore()
{
    let store = createStore(
        persistedReducer,
        /*{},
        compose(
          applyMiddleware(...middlewares),*/
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      /*)*/);
    let persistor = persistStore(store);
    return { store, persistor };
}

/* const store = createStore(
    allReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); */