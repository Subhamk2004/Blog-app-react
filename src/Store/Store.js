import {configureStore} from "@reduxjs/toolkit";
import authReducers from "./authSlice";

// The configureStore function is specifically used to create a Redux store, which is the central state management system for your React application.

let store = configureStore({
    reducer: authReducers
});

export default store;