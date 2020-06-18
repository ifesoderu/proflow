import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../utility";

export const favouriteProjectListSlice = createSlice({
    name: 'projectList',
    initialState: {},
    reducers: {
        getFavouriteProjects: {
            reducer: (state, action) => action.payload,
            prepare: (value) => { return { payload: arrayToObject(value, 'project_id') } }
        },
    }
});

export const { getFavouriteProjects } = favouriteProjectListSlice.actions;

export default favouriteProjectListSlice.reducer