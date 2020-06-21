import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../utility";

export const loadedTasksSlice = createSlice({
    name: 'openedSections',
    initialState: {},
    reducers: {
        loadTasks: {
            reducer: (state, action) => action.payload,
            prepare: (value) => ({ payload: arrayToObject(value, 'id') })
        },
        addNewTask: (state, action) => ({ ...state, [action.payload.id]: action.payload })
    }
});

export const { loadTasks, addNewTask } = loadedTasksSlice.actions

export default loadedTasksSlice.reducer