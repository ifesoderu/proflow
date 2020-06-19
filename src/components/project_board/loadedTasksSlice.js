import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../utility";

export const loadedTasksSlice = createSlice({
    name: 'openedSections',
    initialState: [],
    reducers: {
        loadTasks: (state, action) => state = action.payload
        // {
        //     reducer: ,
        //     prepare: (value) => ({ payload: arrayToObject(value, 'id') })
        // }
    }
});

export const { loadTasks } = loadedTasksSlice.actions

export default loadedTasksSlice.reducer