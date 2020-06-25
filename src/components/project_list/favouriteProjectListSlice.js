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
        addToFavouriteProjects: (state, action) => ({ ...state, [action.payload.project_id]: action.payload }),
        deleteFromFavouriteProjects: (state, action) => {
            let tempState = { ...state }
            delete tempState[action.payload.project_id]
            return { ...tempState }
        }
    }
});

export const { getFavouriteProjects, addToFavouriteProjects, deleteFromFavouriteProjects } = favouriteProjectListSlice.actions;

export default favouriteProjectListSlice.reducer