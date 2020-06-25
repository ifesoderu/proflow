import React, { useState, useEffect } from 'react'
import ViewStatus from '../../assets/img/viewProjectStatusIcon.svg'
import { getTasksBySectionsAndProjectId } from '../../services/taskServices'
import { loadTasks } from '../project_board/loadedTasksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { updateProject } from '../../services/projectServices'
import { editOpenProject } from '../project_details/openedProjectSlice'

export const ProjectProgress = ({ project }) => {
    const { status, project_id } = project
    const [newStatus, setNewStatus] = useState(status)
    const [tasksToShow, setTasksToshow] = useState([]);
    const [taskStatus, setTaskStatus] = useState("Complete")
    const loadedTasks = useSelector(state => state.loadedTasks)
    const dispatch = useDispatch()
    useEffect(() => {
        getTasksBySectionsAndProjectId(project_id).then(
            data => {
                dispatch(loadTasks(data))
            }
        )
        const tasks = Object.values(loadedTasks).filter(({ completed }) => completed === true)
        setTasksToshow(tasks)
        return () => {
            dispatch(loadTasks([]))
        }
    }, [project])
    const renderStatusText = status => {
        switch (status) {
            case "on track":
                return <span className=" text-teal-700">on track <span role="img" aria-label="celebrate"> 🎉</span></span>
            case "at risk":
                return <span className=" text-yellow-600">at risk <span role="img" aria-label="celebrate">⚠</span></span>
            case "off track":
                return <span className=" text-primaryred">off track <span role="img" aria-label="celebrate">😟</span></span>
            default:
                break;
        }
    }
    const renderStatusTasks = (tasks, taskStatus) => {
        return (
            <div className="w-full bg-white rounded-lg p-8 mt-6">
                <span
                    className={`inline-block  h-4 w-4 mr-3 rounded-lg 
                ${taskStatus === 'Complete' && 'bg-teal-400'}
                ${taskStatus === 'Incomplete' && 'bg-primaryred'}
                ${taskStatus === 'Overdue' && 'bg-black'}
                `}></span>
                <span className="text-xl font-bold mb-6">{taskStatus}</span>
                <ul className="">
                    {tasks.map(task => (
                        <li className="my-4 py-3 pl-6 w-full rounded-lg bg-gray-400 text-xl">{task.title}</li>
                    ))}
                </ul>
            </div>
        )
    }

    const handleShowCompleted = () => {
        setTaskStatus('Complete')
        const tasks = Object.values(loadedTasks).filter(({ completed }) => completed === true)
        setTasksToshow(tasks)
    }
    const handleShowIncomplete = () => {
        setTaskStatus('Incomplete')
        const tasks = Object.values(loadedTasks).filter(({ completed }) => !completed)
        setTasksToshow(tasks)
    }
    const handleShowOverdue = () => {
        setTaskStatus('Overdue')
        const tasks = Object.values(loadedTasks).filter(({ completed }) => !completed)
        setTasksToshow([])
    }
    const handleEditProjectClick = (status) => {
        setNewStatus(status)
        updateProject({ ...project, status }).then(
            res => {
                dispatch(editOpenProject(res.data[0]))
            }
        )
    }

    return (
        <div className="mx-auto max-w-3xl pt-48" style={{ minHeight: '100vh' }}>
            <div className="flex mb-10">
                <h2 className="font-bold w-9/12">
                    We're {renderStatusText(newStatus)}
                </h2>
                <select className="w-3/12 border border-gray-700 rounded-lg p-2" onChange={e => { handleEditProjectClick(e.target.value) }}>
                    <option selected={true} hidden={true} disabled={true}>Select project status</option>
                    <option value="on track">on track</option>
                    <option value="at risk">at risk</option>
                    <option value="off track">off track</option>
                </select>
            </div>
            <div className="flex">
                <div onClick={handleShowCompleted} className="w-1/3 cursor-pointer py-3 px-5 flex  mr-5 items-center bg-white rounded-lg" style={{ boxShadow: '0px 4px 15px #e3e3e3' }}>
                    <div className="w-11/12">
                        <span className="font-bold block text-teal-700 text-2xl">
                            {Object.values(loadedTasks).filter(({ completed }) => completed === true).length}
                        </span>
                        <span className="font-semibold text-black text-xl">Completed Tasks</span>
                    </div>
                    <div className="w-1/12">
                        <span className="font-bold block">
                            <img src={ViewStatus} className="align-middle float-right" alt="view status" />
                        </span>
                    </div>
                </div>
                <div onClick={handleShowIncomplete} className="w-1/3 cursor-pointer py-3 px-5 flex mr-5 items-center bg-white rounded-lg" style={{ boxShadow: '0px 4px 15px #e3e3e3' }}>
                    <div className="w-11/12">
                        <span className="font-bold block text-primaryred text-2xl">
                            {Object.values(loadedTasks).filter(({ completed }) => !completed).length}
                        </span>
                        <span className="font-semibold text-black text-xl">Incomplete Tasks</span>
                    </div>
                    <div className="w-1/12">
                        <span className="font-bold block">
                            <img src={ViewStatus} className="align-middle float-right" alt="view status" />
                        </span>
                    </div>
                </div>
                <div onClick={handleShowOverdue} className="w-1/3 cursor-pointer py-3 px-5 flex items-center bg-white rounded-lg" style={{ boxShadow: '0px 4px 15px #e3e3e3' }}>
                    <div className="w-11/12">
                        <span className="font-bold block text-black text-2xl">
                            0
                        </span>
                        <span className="font-semibold text-black text-xl">Overdue Tasks</span>
                    </div>
                    <div className="w-1/12">
                        <span className="font-bold block">
                            <img src={ViewStatus} className="align-middle float-right" alt="view status" />
                        </span>
                    </div>
                </div>
            </div>
            {renderStatusTasks(tasksToShow, taskStatus)}
        </div>
    )
}