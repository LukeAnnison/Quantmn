import { combineReducers } from "@reduxjs/toolkit";
import { quarkReducer } from "./quarkSlice";

export const rootReducer = combineReducers({
    quark: quarkReducer,
})