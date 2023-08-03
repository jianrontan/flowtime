import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { settingsReducer, timeReducer, tagsReducer } from "./reducers";

const rootReducer = combineReducers({
    settingsReducer, timeReducer, tagsReducer
});

export const Store = configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});