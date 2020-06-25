import React, { useEffect, useState } from 'react'
import ThreeDotsIcon from '../../assets/img/ThreeDots.svg'
import AddAssigneeIcon from '../../assets/img/addAssigneeIcon.svg'
import AddDueDateIcon from '../../assets/img/addDueDateIcon.svg'
import ProfileImage from '../../assets/img/profileImage.svg'
import { Draggable } from 'react-beautiful-dnd'
import { getAssignedMembers } from '../../services/memberServices'
import { customFetchGet, api_url } from '../../utility'
import { useDispatch } from 'react-redux'
import { editTaskModalSlice, openEditTaskModal } from './editTaskModalSlice'
import { setCurrentlyOpenedTask } from './currentlyOpenedTaskSlice'
import DeleteIcon from '../../assets/img/deleteIcon.svg'
import { deleteTask } from '../../services/taskServices'
import { deleteSelectedTask } from './loadedTasksSlice'

export const ProjectTask = ({ title, id, description, completed, due_date, section_id, index, handleDeleteTask }) => {
    const [memberEmails, setMemberEmails] = useState([])
    const dispatch = useDispatch()
    const handleEditTask = () => {
        dispatch(setCurrentlyOpenedTask({ id, title, description, completed, due_date, section_id, memberEmails }))
        dispatch(openEditTaskModal())
    }
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        const email = window.localStorage.getItem('email');

        fetch(`${api_url}/assignedmembers/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'useremail': email
            }
        })
            .then(res => res.json())
            .then(data => {
                let memberEmailArr = data.memberEmails.map(({ member_email }) => member_email)
                console.log(memberEmailArr)
                setMemberEmails(memberEmailArr)
            })

    }, [])

    return (
        <Draggable
            draggableId={`${id}`}
            index={index}
        >{
                (provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        className={`py-5 px-3.5 w-full  mb-5 bg-white rounded-lg`}

                    // className={`py-5 px-3.5 w-full  mb-5 ${snapshot.isDragging ? 'bg-red-200' : 'bg-white'} rounded-lg`}
                    >
                        <div className="flex">
                            <span className={`text-base flex-grow font-semibold ${completed ? 'line-through' : ''}`}>{title}</span>
                            <button onClick={e => { e.preventDefault(); handleDeleteTask({ id }) }} className="w-2/12 p-0 mb-1 bg-opacity-0 rounded-lg"><img className="float-right" src={DeleteIcon} alt="section menu" /></button>
                        </div>
                        <div onClick={() => { handleEditTask({ title, id }) }} className=" flex mt-1 flex-wrap">
                            {memberEmails.length !== 0 ?
                                (<span className="">
                                    {(memberEmails.map((assignee, _, arr) => (
                                        <img src={ProfileImage} className={`w-5.5 mr-2 bg-gray-300 border inline-block rounded-full ${arr.length > 4 && 'mb-3'}`} alt="add assignee" />
                                    )))}
                                </span>) :
                                <span className="w-1/5"><img src={AddAssigneeIcon} alt="add assignee" /></span>
                            }
                            <span className="ml-1 w-2/5"><img src={AddDueDateIcon} alt="add due date" /></span>
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}