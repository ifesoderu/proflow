import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../utility";

export const joinedTeamsSlice = createSlice({
    name: 'joinedTeam',
    initialState: {},
    reducers: {
        getJoinedTeamsAction: (state, action) => action.payload
    }
});

export const { getJoinedTeamsAction } = joinedTeamsSlice.actions;

export default joinedTeamsSlice.reducer