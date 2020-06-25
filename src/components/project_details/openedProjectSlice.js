import { createSlice } from "@reduxjs/toolkit";

export const openedProjectSlice = createSlice({
    name: 'openedProject',
    initialState: {},
    reducers: {
        loadOpenProject: (state, action) => action.payload,
        editOpenProject: (state, action) => action.payload,
        deleteOpenProject: (state, action) => {
            let tempState = { ...state }
            delete tempState[action.payload.project_id]
            return { ...tempState }
        }
    }
})

export const { loadOpenProject, editOpenProject, deleteOpenProject } = openedProjectSlice.actions;

export default openedProjectSlice.reducer