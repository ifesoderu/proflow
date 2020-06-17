import { createSlice } from '@reduxjs/toolkit';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {}
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginRequest: (state, action) => ({ loggingIn: true, user: action.payload }),
        loginSuccess: (state, action) => ({ loggedIn: true, user: action.payload }),
        loginFailure: (state, action) => ({}),
        logout: (state, action) => ({}),
    },
    // extraReducers: {

    // }
});

export const { loginRequest, loginFailure, loginSuccess, logout } = loginSlice.actions

export const selectAuth = state => state.authentication;

export default loginSlice.reducer;