import React, { useEffect, useState } from 'react'
import { getProjectSections } from '../../services/sectionServices'
import { useDispatch, useSelector } from 'react-redux'
import { loadSections } from './loadedSectionsSlice'
import { getTasksBySectionsAndProjectId } from '../../services/taskServices'
import { arrayToObject } from '../../utility'
import { loadTasks } from './loadedTasksSlice'
import { ProjectSection } from './ProjectSection'


export const ProjectBoard = ({ projectID, projectDesc }) => {
    const dispatch = useDispatch()
    const loadedSections = useSelector(state => state.loadedSections)
    const loadedTasks = useSelector(state => state.loadedTasks)
    const [showDescription, setShowDescription] = useState(false)
    useEffect(() => {
        getProjectSections(projectID).then(
            sections => {
                dispatch(loadSections(sections))
            },
            error => {

            }
        )
        getTasksBySectionsAndProjectId(projectID).then(
            data => {
                dispatch(loadTasks(data))
            })
    }, [])
    return (
        <div className="mx-10 h-screen">
            <span className="block mb-4 text-gray-800 font-semibold cursor-pointer py-6" onClick={() => { setShowDescription(!showDescription) }}>{showDescription ? (projectDesc) : 'Show project description'}</span>
            <div className="flex flex-no-wrap">
                {loadedSections.slice().reverse().map(section => <ProjectSection {...section} tasks={loadedTasks} />)}
                {/* {Object.values(loadedSections).forEach(section => {
                console.log(section.name)
                return (
                    <div>
                    <h2>PO</h2>
                    {section.name}
                    {Object.values(loadedTasks).forEach(task => task.section_id === section.id ? (<div>{task.title}</div>) : undefined)}
                    </div>
                    )
            })} */}
            </div>
        </div>
    )
}
    // let sections = sectionsObject
    // Object.values(sectionsObject).map(value => ({ ...value, tasks: {} }));

    // sections {
    //     1:{
    //         tasks:{
    //             1:{

    //             }
    //         }
    //     }
    // }
    // data.forEach((task, index) => {
    //     sections[task.section_id].tasks.push(task.id)
    // });
    // setNestedSections(sections)