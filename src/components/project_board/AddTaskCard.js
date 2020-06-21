import React, { useState } from 'react'
import { postTask } from '../../services/taskServices'
import { useDispatch } from 'react-redux'
import { addNewTask } from "./loadedTasksSlice";

export const AddTaskCard = ({ sectionID, projectID, closeAddTaskCard }) => {
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    const checkKeyEntered = e => {
        if (e.keyCode === 13) {
            // console.log({ title, section_id: sectionID, project_id: projectID })
            postTask({ title, section_id: sectionID, project_id: projectID }).then(
                res => {
                    if (!res.success) {
                        throw new Error("Could not add task")
                    } else {
                        dispatch(addNewTask(res.data[0]))
                        closeAddTaskCard()
                    }
                }
            )
        }
    }
    return (
        <div className="py-1 px-3.5 w-full h-20 mb-5 bg-white rounded-lg">
            <input className="border-0 outline-none p-0" value={title} onChange={e => { setTitle(e.target.value) }} onKeyDown={checkKeyEntered} />
        </div>
    )
}