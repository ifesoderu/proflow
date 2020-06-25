import React, { useEffect, useState } from 'react'
import { getProjectSections, postSection } from '../../services/sectionServices'
import { useDispatch, useSelector } from 'react-redux'
import { loadSections, addNewSection } from './loadedSectionsSlice'
import { getTasksBySectionsAndProjectId, updateTask } from '../../services/taskServices'
import { arrayToObject } from '../../utility'
import { loadTasks } from './loadedTasksSlice'
import { ProjectSection } from './ProjectSection'
import { DragDropContext } from 'react-beautiful-dnd'
import { errorAlert, neutralAlertAsync } from '../alert/alertSlice'
import { addNestedSections } from './nestedSectionsSlice'
import AddTaskIcon from '../../assets/img/addIcon.svg'


export const ProjectBoard = ({ projectID, projectDesc }) => {
    const dispatch = useDispatch()
    const loadedSections = useSelector(state => state.loadedSections)
    const loadedTasks = useSelector(state => state.loadedTasks)
    const nestedSections = useSelector(state => state.nestedSections)
    const [showDescription, setShowDescription] = useState(false)

    const handleAddSection = () => {
        postSection({ name: 'Click to edit', projectID }).then(
            res => {
                dispatch(addNewSection(res.data[0]))
            }
        )
    }
    useEffect(() => {
        getProjectSections(projectID).then(
            sections => {
                dispatch(loadSections(sections))
            },
            error => {
                dispatch(errorAlert(error.toString()));
                dispatch(neutralAlertAsync())
            }
        )
        getTasksBySectionsAndProjectId(projectID).then(
            data => {
                dispatch(loadTasks(data))
            }
        )
        return () => {
            console.log('ooo')
            dispatch(addNestedSections({}))
            dispatch(loadSections([]))
            dispatch(loadTasks([]))
        }
    }, [projectID])

    useEffect(() => {
        if (Object.keys(loadedSections).length === 0) return
        let nestedSections = {}
        Object.values(loadedSections).forEach(({ id, name }) => {
            nestedSections[`${id}`] = { id, name, taskIDs: [] }
        });
        if (Object.keys(nestedSections).length === 0) return
        Object.values(loadedTasks).forEach((task) => {
            const { section_id, id } = task
            nestedSections[`${section_id}`] = { ...nestedSections[`${section_id}`], taskIDs: [...nestedSections[`${section_id}`].taskIDs, `${id}`] }
        });
        dispatch(addNestedSections(nestedSections))
    }, [loadedSections, loadedTasks])

    const renderSections = (nestedSections) => Object.values(nestedSections).map((section, index) => {
        const fullTask = section.taskIDs.filter(id => Object.keys(loadedTasks).includes(id)).map((id) => loadedTasks[id])
        return <ProjectSection key={`${section.id}`} {...section} tasks={fullTask} projectID={projectID} />
    })

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = nestedSections[source.droppableId];
        const finish = nestedSections[destination.droppableId];
        if (start === finish) {
            const newTaskIDs = Array.from(start.taskIDs)
            newTaskIDs.splice(source.index, 1)
            newTaskIDs.splice(destination.index, 0, draggableId);

            const newSection = {
                ...start,
                taskIDs: newTaskIDs
            }

            const newNestedSections = {
                ...nestedSections,
                [start.id]: newSection
            }
            dispatch(addNestedSections(newNestedSections))
            return;
            // swap row ids in the DB
        }
        // Moving to different section

        // finish.id should be the new section_id of task with id droppableId
        const startTaskIDs = Array.from(start.taskIDs);
        startTaskIDs.splice(source.index, 1)
        const newStartSection = {
            ...start,
            taskIDs: startTaskIDs
        }

        const finishTaskIDs = Array.from(finish.taskIDs);
        finishTaskIDs.splice(destination.index, 0, draggableId)

        const newFinishSection = {
            ...finish,
            taskIDs: finishTaskIDs
        }

        const newNestedSections = {
            ...nestedSections,
            [start.id]: newStartSection,
            [finish.id]: newFinishSection
        }
        dispatch(addNestedSections(newNestedSections))

        let temp = { ...loadedTasks };
        updateTask({ ...temp[draggableId], section_id: finish.id }).then(
            data => {

            },
            err => {
                console.log(err.toString())
            }
        )



    }
    return (
        <div className="relative">

            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <div className="mx-10 pt-32" style={{ minHeight: '100vh' }}>
                    <span className="block my-4 text-gray-800 font-semibold cursor-pointer py-6" onClick={() => { setShowDescription(!showDescription) }}>{showDescription ? (projectDesc) : 'Show project description'}</span>
                    <div className="flex flex-no-wrap">
                        {renderSections(nestedSections)}
                        <button className="bg-white text-gray-600 bg-opacity-25 sticky mt-20 mb-5 h-64 w-48" style={{ paddingTop: '2.5px', paddingBottom: '2.5px' }} onClick={e => { handleAddSection(e) }}><img className="mx-auto" src={AddTaskIcon} alt="add task" /> Add Section</button>
                    </div>
                </div>
            </DragDropContext>
        </div>
    )
}