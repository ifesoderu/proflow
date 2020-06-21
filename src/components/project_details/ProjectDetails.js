import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getMemberProjects } from '../../services/projectServices'
import { arrayToObject } from '../../utility'
import { useDispatch, useSelector } from 'react-redux'
import { loadOpenProject } from './openedProjectSlice'
import ProfileImage from '../../assets/img/profileImage.svg'
import { errorAlert, neutralAlert } from '../alert/alertSlice'

import EditIcon from '../../assets/img/editIcon.svg'
import DeleteIcon from '../../assets/img/deleteIcon.svg'
import FavouriteIcon from '../../assets/img/favouriteIcon.svg'
import { ProjectBoard } from '../project_board/ProjectBoard'
import { ProjectComments } from '../project_comments/ProjectComments'


export const ProjectDetails = () => {
    const { projectID } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('board')
    const openedProject = useSelector(state => state.openedProject)
    useEffect(() => {
        // if user is in a team that created this project then show user
        // Get teams that the user belongs to from team_membership
        // Get projects created by each team
        const email = localStorage.getItem('email')
        if (!email) { history.push('/login') }
        getMemberProjects(email).then(
            projects => {
                const projectDetails = arrayToObject(projects, 'project_id')[projectID]
                if (!projectDetails) { throw Error(`You are not a member of the team that created the project`) }
                dispatch(loadOpenProject(projectDetails))
            },
            error => {
                dispatch(errorAlert(error.toString()))
                dispatch(neutralAlert())
                history.push('/dashboard')
            }
        ).catch(error => {
            dispatch(errorAlert(error.toString()))
            dispatch(neutralAlert())
            history.push('/dashboard')
        })
    }, [])
    const renderActiveTab = param => {
        console.log(openedProject)
        switch (param) {
            case 'board':
                return <ProjectBoard projectID={projectID} projectDesc={openedProject.description} />
            case 'timeline':

                break;
            case 'comments':
                return <ProjectComments projectID={projectID} />
            case 'progress':

                break;

            default:
                break;
        }
    }
    return (
        <div>
            <div className="w-full fixed z-20 bg-white">
                <div className='mx-10 max-w-xs mt-12' style={{ minWidth: '860px' }}>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-5/6 flex ">
                            <h2 className="font-bold flex-grow inline-block" style={{ minWidth: '250px' }}>{openedProject.name}</h2>
                            <div className="inline-block self-end w-3/5">
                                <button className="p-0 pt-1 bg-opacity-0 mr-5"><img src={FavouriteIcon} alt="favourite icon" /></button>
                                <button className="p-0 pt-1 bg-opacity-0 mr-5"><img src={EditIcon} alt="edit icon" /></button>
                                <button className="p-0 pt-1 bg-opacity-0 "><img src={DeleteIcon} alt="delete icon" /></button>
                            </div>
                        </div>
                        <span className="w-1/6 mx-auto"><img className="w-8 h-8 pt-2 float-right rounded-full border border-red-500 bg-gray-100" src={ProfileImage} alt="profile icon" /></span>
                    </div>
                    <div className="flex mb-4 text-lg font-semibold">
                        <span className={`bg-opacity-0 cursor-pointer mr-6 `} onClick={() => { setActiveTab('board') }}>
                            Board
                        {activeTab === 'board' && <hr className=' border rounded-full border-primaryred' />}
                        </span>
                        <span className={`bg-opacity-0 cursor-pointer mr-6`} onClick={() => { setActiveTab('timeline') }}>
                            Timeline
                        {activeTab === 'timeline' && <hr className=' border rounded-full border-primaryred' />}
                        </span>
                        <span className={`bg-opacity-0 cursor-pointer mr-6`} onClick={() => { setActiveTab('comments') }}>
                            Comments
                        {activeTab === 'comments' && <hr className=' border rounded-full border-primaryred' />}
                        </span>
                        <span className={`bg-opacity-0 cursor-pointer mr-6`} onClick={() => { setActiveTab('progress') }}>
                            Progress
                        {activeTab === 'progress' && <hr className=' border rounded-full border-primaryred' />}
                        </span>
                    </div>
                </div>
            </div>
            <div className></div>
            <div className="max-w-full overflow-x-visible">
                {renderActiveTab(activeTab)}
            </div>
        </div>
    )
}