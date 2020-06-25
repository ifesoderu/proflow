import React, { useEffect, useState } from 'react'
import { getProjectComments, postProjectComment } from '../../services/commentServices'
import { useDispatch, useSelector } from 'react-redux'
import { loadProjectComments, addProjectComment } from './projectCommentsSlice'
import ProfileImage from '../../assets/img/profileImage.svg'
import PostIcon from '../../assets/img/postIcon.svg'
import { ProjectComment } from './ProjectComment'
import { errorAlert, neutralAlert, neutralAlertAsync } from '../alert/alertSlice'

export const ProjectComments = ({ projectID }) => {
    const [newComment, setNewComment] = useState('')
    const dispatch = useDispatch()
    const projectComments = useSelector(state => state.projectComments)
    useEffect(() => {
        getProjectComments(projectID).then(
            comments => {
                dispatch(loadProjectComments(comments))
            }
        )
        return () => {
            dispatch(loadProjectComments([]))
        }
    }, [projectID])
    const postComment = (body) => {
        postProjectComment(body).then(
            res => {
                console.log(res)
                if (res.success) {
                    dispatch(addProjectComment(res.data[0]))
                    setNewComment('')
                } else {
                    throw new Error('Could not post comment')
                }
            },
            error => {
                dispatch(errorAlert(error.toSting()))
                dispatch(neutralAlertAsync())
            }
        )
    }
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
        <div className="max-w-xl relative pt-32 pt-5 mx-auto" style={{ minHeight: '100vh' }}>
            <div className="overflow-y-auto" style={{ height: '50vh' }}>
                {renderProjectComments(projectComments)}
            </div>

            <div className="fixed mt-4 w-full max-w-xl" style={{ backgroundColor: "#EFEFEF" }}>
                <textarea placeholder="Ask a question or post an update..." value={newComment} onChange={e => { setNewComment(e.target.value) }} className="w-full p-4 h-20 border border-primaryred block rounded-lg mb-6" />
                <button className="py-2 px-4 float-right" onClick={e => {
                    e.preventDefault()
                    postComment({ projectID, owner_email: localStorage.getItem('email'), content: newComment })
                }}>
                    <img src={PostIcon} alt="post icon" className="mr-1 inline-block w-6 h-6" />
                    Post
                </button>
            </div>
        </div>
    )
}