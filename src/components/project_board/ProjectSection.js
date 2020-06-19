import React from 'react'
import { ProjectTask } from './ProjectTask'
import AddTaskIcon from '../../assets/img/addIcon.svg'
import ThreeDotsIcon from '../../assets/img/ThreeDots.svg'

const renderFilteredTasks = (id, tasks) => {
    const filteredTask = tasks.filter(task => task.section_id === id)
    return filteredTask.length === 0 ?
        (<span className="bg-white bg-opacity-50 block w-full h-40 rounded-lg"></span>) :
        filteredTask.map(task => <ProjectTask {...task} />)

}

export const ProjectSection = ({ name, id, tasks }) => {
    return (
        <div className="w-64 mr-10">
            <div className="flex mb-5">
                <p className=" text-1xl font-semibold flex-grow">{name}</p>
                <button className="w-2/12 p-0 mb-3 bg-opacity-0 rounded-lg"><img className="float-right" src={ThreeDotsIcon} alt="section menu" /></button>
            </div>
            <button className="bg-white mb-5 w-full" style={{ paddingTop: '2.5px', paddingBottom: '2.5px', boxShadow: '0px 4px 15px #e3e3e3' }}><img className="mx-auto" src={AddTaskIcon} alt="add task" /></button>
            {
                renderFilteredTasks(id, tasks)
            }
        </div>
    )
}