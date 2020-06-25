import { createSlice } from "@reduxjs/toolkit";

export const isFirstTeamSlice = createSlice({
    name: "isFirstTeam",
    initialState: true,
    reducers: {
        getIsFirstTeam: (state, action) => action.payload
    }
});

export const { getIsFirstTeam } = isFirstTeamSlice.actions;

export default isFirstTeamSlice.reducer