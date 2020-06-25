import { createSlice } from "@reduxjs/toolkit";

export const addTeamModalSlice = createSlice({
    name: "addTeamModal",
    initialState: false,
    reducers: {
        openAddTeamModal: (state) => true,
        closeAddTeamModal: (state) => false
    }
});


export const { openAddTeamModal, closeAddTeamModal } = addTeamModalSlice.actions;

export default addTeamModalSlice.reducer