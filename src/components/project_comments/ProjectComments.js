import React, { useEffect, useState } from 'react'
import { getProjectComments } from '../../services/commentServices'
import { useDispatch, useSelector } from 'react-redux'
import { loadProjectComments } from './projectCommentsSlice'
import ProfileImage from '../../assets/img/profileImage.svg'
import PostIcon from '../../assets/img/postIcon.svg'

export const ProjectComment = ({ projectID }) => {
    const dispatch = useDispatch()
    const [showTime, setShowTime] = useState(false)
    const projectComments = useSelector(state => state.projectComments)
    useEffect(() => {
        getProjectComments(projectID).then(
            comments => {
                dispatch(loadProjectComments(comments))
            }
        )
    }, [])
    const renderProjectComments = projectComments => {
        return projectComments.map(({ content, owner_email }) => {
            const loggedInUserEmail = localStorage.getItem('email')
            return (
                loggedInUserEmail !== owner_email ? (<div className={`flex mb-3`}>
                    <img src={ProfileImage} className={`w-5.5 mr-2 bg-gray-300 border inline-block rounded-full`} alt="sender" />
                    <span className="mr-3 font-semibold ">{content}</span>
                    <span className="text-sm text-gray-600">3 minutes ago</span>
                </div>) : <ProjectComment content={content} />
            )
        })
    }
    return (
        <div className="max-w-xl pt-5 mx-auto">
            <div className="h-64 overflow-y-auto">
                {renderProjectComments(projectComments)}
            </div>

            <div className="mt-8 mb-0">
                <textarea placeholder="Ask a question or post an update..." className="w-full p-4 h-32 border border-primaryred block rounded-lg mb-6" />
                <button className="float-right py-2 px-4">
                    <img src={PostIcon} alt="" className="mr-1 inline-block w-6 h-6" />
                    Post
                </button>
            </div>
        </div>
    )
}