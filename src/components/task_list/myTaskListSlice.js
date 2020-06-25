import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../utility";

export const myTaskListSlice = createSlice({
    name: 'myTaskList',
    initialState: {},
    reducers: {
        getMyTasks: {
            reducer: (state, action) => action.payload,
            prepare: (value) => { return { payload: arrayToObject(value, 'id') } }
        },
        updateTaskSuccessful: (state, action) => {
            state[action.payload.id] = action.payload.task
            return state
        },
        updateTaskFailed: (state, action) => {
            return state
        }
    }
})

export const { getMyTasks, updateTaskSuccessful, updateTaskFailed } = myTaskListSlice.actions;

export default myTaskListSlice.reducer