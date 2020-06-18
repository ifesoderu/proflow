import { createSlice } from "@reduxjs/toolkit";

export const openedProjectSlice = createSlice({
    name: 'openedProject',
    initialState: {},
    reducers: {
        loadOpenProject: (state, action) => state = action.payload
    }
})

export const { loadOpenProject } = openedProjectSlice.actions;

export default openedProjectSlice.reducer