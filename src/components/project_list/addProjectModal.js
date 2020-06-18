import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../utility";

export const addProjectModal = createSlice({
    name: 'projectList',
    initialState: false,
    reducers: {
        openAddProjectModal: (state) => true,
        closeAddProjectModal: (state) => false,
    }
});

export const { openAddProjectModal, closeAddProjectModal } = addProjectModal.actions;

export default addProjectModal.reducer