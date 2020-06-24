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
        addNewTask: (state, action) => ({ ...state, [action.payload.id]: action.payload }),
        editTask: (state, action) => ({ ...state, [action.payload.id]: action.payload }),
        deleteSelectedTask: (state, action) => {
            let tempState = { ...state }

            delete tempState[action.payload.tid]
            return { ...tempState }
        }
    }
});

export const { loadTasks, addNewTask, editTask, deleteSelectedTask } = loadedTasksSlice.actions

export default loadedTasksSlice.reducer