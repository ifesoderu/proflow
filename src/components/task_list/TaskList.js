import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyTasks, updateTaskSuccessful, updateTaskFailed } from './myTaskListSlice'
import { getTasksByIds, updateTask } from '../../services/taskServices'
import { Task } from './Task'
import { neutralAlert } from '../alert/alertSlice'


export const TaskList = () => {
    const dispatch = useDispatch()
    const myTasks = useSelector(state => state.myTasks)
    // const authentication = useSelector(state => state.authentication)
    let email = localStorage.getItem('email')
    console.log(email)
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
            console.log(e)
        })
    }
    return (
        <div>
            {Object.keys(myTasks).map((taskIndex, index) => {
                return (<Task task={myTasks[taskIndex]} handleTaskUpdate={handleTaskUpdate} />)
            })}
        </div >
    )
}