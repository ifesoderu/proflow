import { createSlice } from '@reduxjs/toolkit';


export const isLoginRouteSlice = createSlice({
    name: 'isLoggedIn',
    initialState: false,
    reducers: {
        authCompleted: (state, action) => true,
        authNotCompleted: (state, action) => false
    }
})

export const { authCompleted, authNotCompleted } = isLoginRouteSlice.actions

export default isLoginRouteSlice.reducer