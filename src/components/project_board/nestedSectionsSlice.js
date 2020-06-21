import { createSlice } from "@reduxjs/toolkit";

export const nestedSections = createSlice({
    name: 'nestedSections',
    initialState: {},
    reducers: {
        addNestedSections: (state, action) => action.payload
    }
});

export const { addNestedSections } = nestedSections.actions;

export default nestedSections.reducer