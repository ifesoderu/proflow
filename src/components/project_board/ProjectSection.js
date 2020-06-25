import React, { useState } from 'react'
import { ProjectTask } from './ProjectTask'
import AddTaskIcon from '../../assets/img/addIcon.svg'
import ThreeDotsIcon from '../../assets/img/ThreeDots.svg'
import DeleteIcon from '../../assets/img/deleteIcon.svg'

import { AddTaskCard } from './AddTaskCard'
import { Droppable } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { updateSection, deleteSection } from '../../services/sectionServices'
import { updateSectionTitle, deleteSelectedSection } from './loadedSectionsSlice'
import { deleteTask } from '../../services/taskServices'
import { deleteSelectedTask } from './loadedTasksSlice'

export const ProjectSection = ({ name, id, tasks, projectID }) => {
    const [addTaskCardOpen, setAddTaskCardOpen] = useState(false)
    const [sectionTitle, setSectionTitle] = useState(name)
    const dispatch = useDispatch()

    const loadedTasks = useSelector(state => state.loadedTasks)

    const openAddTaskCard = (e) => {
        e.preventDefault();
        setAddTaskCardOpen(!addTaskCardOpen)
    };

    const closeAddTaskCard = () => {
        setAddTaskCardOpen(false)
    }

    const handleSectionTitle = e => {
        e.preventDefault();
        setSectionTitle(e.target.value);
    }

    const handleSectionUpdate = (id, sectionTitle) => {
        updateSection({ id, sectionTitle }).then(
            res => {
                dispatch(updateSectionTitle(res.data[0]))
            }
        )
    }
    const handleDeleteSection = id => {
        const proceedWithDeletion = window.confirm('Kindly confirm that you want to delete this Section')
        if (!proceedWithDeletion) return;
        deleteSection(id).then(
            res => {
                dispatch(deleteSelectedSection({ id }))
            }
        )
    }

    const handleDeleteTask = (id, sectionID) => {
        const proceedWithDeletion = window.confirm('Kindly confirm that you want to delete this Task')
        if (!proceedWithDeletion) return;
        deleteTask(id.id).then(
            res => {
                const tid = id.id
                dispatch(deleteSelectedTask({ tid, sectionID }))
            }
        )

    }

    // title, description, completed, due_date, section_id, project_id
    const renderFilteredTasks = (id, tasks, isDraggingOver, addTaskModalOpen) => {
        return tasks.length === 0 && !addTaskModalOpen ?
            (<span className={`bg-white bg-opacity-50 block w-full h-40 rounded-lg`}></span>) :
            <div>
                {tasks.map((task, index) => <ProjectTask handleDeleteTask={(tid) => { handleDeleteTask(tid, id) }} key={`${task.id}`} {...task} sectionID={id} index={index} />)}
            </div>
    }
    return (
        <div className="w-64 flex-col mb-6 mr-10">
            <div className="flex mb-5">
                <input value={sectionTitle} onChange={handleSectionTitle} onBlur={() => { handleSectionUpdate(id, sectionTitle) }} className=" text-1xl text-black border-none focus:outline-none focus:shadow-none font-semibold flex-grow" style={{ backgroundColor: '#efefef' }} />
                <button onClick={e => { e.preventDefault(); handleDeleteSection(id) }} className="w-2/12 p-0 mb-3 bg-opacity-0 rounded-lg"><img className="float-right" src={DeleteIcon} alt="section menu" /></button>

            </div>
            <button className="bg-white mb-5 w-full" style={{ paddingTop: '2.5px', paddingBottom: '2.5px', boxShadow: '0px 4px 15px #e3e3e3' }} onClick={e => { openAddTaskCard(e) }}><img className="mx-auto" src={AddTaskIcon} alt="add task" /></button>
            {addTaskCardOpen ? <AddTaskCard sectionID={id} projectID={projectID} closeAddTaskCard={closeAddTaskCard} /> : undefined}
            <Droppable droppableId={`${id}`} >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        className={`flex-grow p-2 w-full rounded-lg ${snapshot.isDraggingOver ? ' bg-gray-500 bg-opacity-25' : ''}`}
                    // style={{ minHeight: '300px' }}

                    >
                        {
                            renderFilteredTasks(id, tasks, snapshot.isDraggingOver, addTaskCardOpen)
                        }
                        {provided.placeholder}

                    </div>)}
            </Droppable>
        </div >
    )
}