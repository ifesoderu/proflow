import { createSlice } from "@reduxjs/toolkit";

export const projectCommentSlice = createSlice({
    name: 'projectComments',
    initialState: [],
    reducers: {
        loadProjectComments: (state, action) => state = action.payload,
        addProjectComment: (state, action) => [...state, action.payload]
    }
});

export const { loadProjectComments, addProjectComment } = projectCommentSlice.actions;

export default projectCommentSlice.reducer