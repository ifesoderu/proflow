import { createSlice } from "@reduxjs/toolkit";
import { deleteOpenProject } from "../project_details/openedProjectSlice";

export const joinedTeamProjectsSlice = createSlice({
    name: 'joinedTeamProjects',
    initialState: [],
    reducers: {
        getJoinedProjects: (state, action) => action.payload,
    },
    extraReducers: {
        [deleteOpenProject]: (state, action) => {
            return state.filter(({ project_id }) => project_id !== parseInt(action.payload.project_id, 10))
        }
    }
});


export const { getJoinedProjects } = joinedTeamProjectsSlice.actions;

export default joinedTeamProjectsSlice.reducer