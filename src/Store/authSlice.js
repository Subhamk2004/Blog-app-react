import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    status:false,
    userData:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true;
            state.userData = action.payload;
        },
        logout:(state,action)=>{
            state.status = false;
            state.userData = null;
        }
    }
});


export const {login,logout} = authSlice.actions;

// we have already the function for login and logout in the auth.js file, but by that the user will login or logout but our react application won't know about it,

//  so to let our react application know about the login and logout we will use the redux toolkit, so it can manage the state of our application.


let authReducers = authSlice.reducer;

export default authReducers;

// In Redux, a "slice" refers to a specific portion of your application's state managed by a single reducer function.

//  Reducers are pure functions that take the current state and an action (an object describing what happened in the application), and return the updated state for that slice.