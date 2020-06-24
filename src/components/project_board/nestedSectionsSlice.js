import { createSlice, current } from "@reduxjs/toolkit";
import { loadedTasksSlice } from "./loadedTasksSlice";

export const nestedSections = createSlice({
    name: 'nestedSections',
    initialState: {},
    reducers: {
        addNestedSections: (state, action) => action.payload
    },
    // extraReducers: {
    //     [loadedTasksSlice.actions.deleteSelectedTask]: (state, action) => {
    // let tempState = { ...state }
    // let tempSecTaskIDsState = tempState[action.payload.sectionID].taskIDs.filter(id => id !== action.payload.tid)
    // let tempSecState = { ...tempState, [action.payload.sectionID]: }
    // tempSecState.taskIDs = tempSecTaskIDsState;
    // return tempState

    // state[action.payload.sectionID].taskIDs = state[action.payload.sectionID].taskIDs.filter(id => id !== action.payload.tid); 
    // return { ...state, state }
    // return state;
    // }
    // }
});

export const { addNestedSections } = nestedSections.actions;

export default nestedSections.reducer