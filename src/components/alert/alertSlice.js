import { createSlice } from '@reduxjs/toolkit';
import { loginFailure, loginSuccess } from '../login/loginSlice'
import { updateTaskFailed, updateTaskSuccessful } from '../task_list/myTaskListSlice';


export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        type: '',
        message: ''
    },
    reducers: {
        neutralAlert: (state) => ({
            type: '',
            message: ''
        }),
        errorAlert: (state, action) => ({
            type: 'error',
            message: action.payload
        }),
        successAlert: (state, action) => ({
            type: 'success',
            message: action.payload
        })
    }, extraReducers: {
        [loginFailure]: (state, action) => ({ type: 'error', message: action.payload }),
        [loginSuccess]: (state, action) => ({ type: 'success', message: 'Login Successful' }),
        [updateTaskSuccessful]: (state, action) => ({ type: 'success', message: 'Update Successful' }),
        [updateTaskFailed]: (state, action) => ({ type: 'success', message: 'Update Failed' })

    }
})

export const neutralAlertAsync = () => dispatch => {
    setTimeout(() => {
        dispatch(neutralAlert());
    }, 3000);
};

export const { neutralAlert, successAlert, errorAlert } = alertSlice.actions

export const selectAlert = state => state.alert

export default alertSlice.reducer