import { createSlice } from "@reduxjs/toolkit";

export const membersSlice = createSlice({
    name: 'members',
    initialState: [],
    reducers: {
        getTeamMembersAction: (state, action) => action.payload
    }
});

export const { getTeamMembersAction } = membersSlice.actions;

export default membersSlice.reducer;