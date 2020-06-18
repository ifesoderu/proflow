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
            console.log(action)
            state[action.payload.id] = action.payload.task
            return state
        },
        updateTaskFailed: (state, action) => {
            console.log(action.payload)
            // state[action.payload.id] = action.payload
            return state
        }
    }
})

export const { getMyTasks, updateTaskSuccessful, updateTaskFailed } = myTaskListSlice.actions;

export default myTaskListSlice.reducer