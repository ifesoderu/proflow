import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ProfileImage from '../../assets/img/profileImage.svg'
import { TaskList } from '../task_list/TaskList'
import { useDispatch, useSelector } from 'react-redux'
import { ProjectList } from '../project_list/ProjectList'
import { authNotCompleted } from '../login/isLoginRouteSlice'

export const MyTasks = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const myTasks = useSelector(state => state.myTasks)
    const [allMyTasks, setAllMyTasks] = useState([])


    useEffect(() => {
        const email = localStorage.getItem('email')
        if (!email) { history.push('/login') }

        setAllMyTasks(Object.values(myTasks).slice().sort((a, b) => {
            if (b.due_date < a.due_date) {
                return -1
            }
            if (b.due_date > a.due_date) {
                return 1
            }
            return 0
        }))

    }, [])
    const handleMemberLogout = () => {
        const logoutConfirmed = window.confirm("Are you sure you want to Logout?");
        if (logoutConfirmed) {
            localStorage.removeItem('email');
            localStorage.removeItem('token')
            dispatch(authNotCompleted())
            history.push('/login')
        }
    }
    return (
        <div className='px-10 pt-16 bg-white' style={{ minHeight: '100vh' }}>
            <div className="flex max-w-6xl mx-auto">
                <div className="w-5/6">
                    <h2 className="font-bold">My Tasks</h2>
                </div>
                <span onClick={handleMemberLogout} className=" cursor-pointer w-1/6 mx-auto"><img className="w-8 h-8 pt-2 float-right rounded-full border border-red-500 bg-gray-100" src={ProfileImage} alt="profile icon" /></span>
            </div>
            <div style={{ minHeight: '90vh' }}>
                <div className="max-w-3xl mt-10 mb-8  mx-auto">
                    <div className="flex">
                        <h3 className="flex-grow font-semibold">All assigned tasks</h3>
                        <Link className="text-sm mt-1" to='/tasks'><span className="flex-grow font-medium  text-right text-gray-500"></span></Link>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto">
                    <ul>
                        <TaskList limit={false} />
                    </ul>
                </div>
            </div>
        </div>
    )
}