import { createSlice } from "@reduxjs/toolkit";

export const teamIDofOpenedProject = createSlice({
    name: "teamIDofOpenedProject",
    initialState: null,
    reducers: {
        setTeamIDofOpenedProject: (state, action) => action.payload
    }
});


export const { setTeamIDofOpenedProject } = teamIDofOpenedProject.actions;

export default teamIDofOpenedProject.reducer