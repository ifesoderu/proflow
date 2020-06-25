import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyTasks, updateTaskSuccessful, updateTaskFailed } from './myTaskListSlice'
import { getTasksByIds, updateTask } from '../../services/taskServices'
import { Task } from './Task'
import { neutralAlert } from '../alert/alertSlice'


export const TaskList = ({ limit }) => {
    const dispatch = useDispatch()
    const myTasks = useSelector(state => state.myTasks)
    let email = localStorage.getItem('email')
    useEffect(() => {
        getTasksByIds(email).then(data => { dispatch(getMyTasks(data)) })
    }, [])

    const handleTaskUpdate = ({ id, value }) => {
        let taskToUpdate = myTasks[id]
        let updatedTask = { ...taskToUpdate, completed: value }
        updateTask(updatedTask).then(
            (res) => {
                if (!res.success) {
                    dispatch(updateTaskFailed())
                    dispatch(neutralAlert())
                } else {
                    dispatch(updateTaskSuccessful({ id, task: res.data }))
                    dispatch(neutralAlert())
                }
            },
            error => {
                dispatch(updateTaskFailed())
                dispatch(neutralAlert())
            }
        ).catch(e => {
        })
    }
    return (
        <div>
            {limit && Object.values(myTasks).slice().sort((a, b) => {
                if (b.due_date < a.due_date) {
                    return -1
                }
                if (b.due_date > a.due_date) {
                    return 1
                }
                return 0
            }).slice(0, 3).map(({ id }, index) => {
                return (<Task task={myTasks[id]} handleTaskUpdate={handleTaskUpdate} />)
            })}
            {!limit && Object.values(myTasks).slice().sort((a, b) => {
                if (b.due_date < a.due_date) {
                    return -1
                }
                if (b.due_date > a.due_date) {
                    return 1
                }
                return 0
            }).map(({ id }, index) => {
                return (<Task task={myTasks[id]} handleTaskUpdate={handleTaskUpdate} />)
            })}
        </div >
    )
}