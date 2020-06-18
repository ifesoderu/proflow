import { createSlice } from '@reduxjs/toolkit';


export const isLoginRouteSlice = createSlice({
    name: 'isLoginRoute',
    initialState: window.location.pathname === '/login',
    reducers: {
        authCompleted: (state, action) => false,
        authNotCompleted: (state, action) => true
    }
})

export const { authCompleted, authNotCompleted } = isLoginRouteSlice.actions

export default isLoginRouteSlice.reducer