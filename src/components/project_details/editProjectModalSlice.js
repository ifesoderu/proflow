import { createSlice } from "@reduxjs/toolkit";

export const editProjectModalSlice = createSlice({
    name: "addEditProjectModal",
    initialState: false,
    reducers: {
        openEditProjectModal: (state) => true,
        closeEditProjectModal: (state) => false
    }
});


export const { openEditProjectModal, closeEditProjectModal } = editProjectModalSlice.actions;

export default editProjectModalSlice.reducer