import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ProfileImage from '../../assets/img/profileImage.svg'
import { TaskList } from '../task_list/TaskList'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../login/loginSlice'
import { ProjectList } from '../project_list/ProjectList'
import { getFavouriteProjects } from '../project_list/favouriteProjectListSlice'
import { getFavouritedProjects } from '../../services/projectServices'
import { authNotCompleted } from '../login/isLoginRouteSlice'
// import { getIsFirstTeam } from '../setup_team/isFirstTeamSlice'

export const Dashboard = () => {
    const favouriteProjects = useSelector(state => state.favouriteProjects)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const email = localStorage.getItem('email')
        if (!email) { history.push('/login') }
        getFavouritedProjects(email).then(data => { dispatch(getFavouriteProjects(data)) })
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
        <div className='px-10 pt-16 bg-white ' >
            <div className="flex mx-auto max-w-6xl">
                <div className="w-5/6">
                    <h2 className="font-bold">Dashboard</h2>
                </div>
                <span onClick={handleMemberLogout} className=" cursor-pointer w-1/6 mx-auto"><img className="w-8 h-8 pt-2 float-right rounded-full border border-red-500 bg-gray-100" src={ProfileImage} alt="profile icon" /></span>
            </div>
            <div>
                <div className="max-w-3xl mt-10 mb-8  mx-auto">
                    <div className="flex">
                        <h3 className="flex-grow font-semibold">Tasks Due Soon</h3>
                        <Link className="text-sm mt-1" to='/tasks'><span className="flex-grow font-medium  text-right text-gray-500">View all the tasks </span></Link>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto">
                    <ul>
                        <TaskList limit={true} />
                    </ul>
                </div>
            </div>
            <hr className="my-10 mx-auto max-w-6xl" />
            <div>
                <div className="max-w-3xl mt-10 mb-8  mx-auto">
                    <div className="flex">
                        <h3 className="flex-grow font-semibold">Favourited Projects</h3>
                        <button className="text-sm mt-1 py-0 bg-opacity-0"><span className="flex-grow font-medium  text-right text-gray-500"></span></button>
                        {/* <button className="text-sm mt-1 py-0 bg-opacity-0"><span className="flex-grow font-medium  text-right text-gray-500">View all</span></button> */}
                    </div>
                </div>
                <div className="max-w-3xl mx-auto">
                    <ProjectList projects={favouriteProjects} />
                </div>
            </div>
        </div>
    )
}