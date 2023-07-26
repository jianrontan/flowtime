import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { settingsReducer, timeReducer } from "./reducers";

const rootReducer = combineReducers({settingsReducer, timeReducer});

export const Store = configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});