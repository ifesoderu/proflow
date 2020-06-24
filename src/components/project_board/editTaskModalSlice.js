import { createSlice } from "@reduxjs/toolkit";

export const editTaskModalSlice = createSlice({
    name: "editTask",
    initialState: false,
    reducers: {
        openEditTaskModal: (state) => true,
        closeEditTaskModal: (state) => false
    }
});


export const { openEditTaskModal, closeEditTaskModal } = editTaskModalSlice.actions;

export default editTaskModalSlice.reducer