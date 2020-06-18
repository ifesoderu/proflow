import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import ProfileImage from '../../assets/img/profileImage.svg'
import { TaskList } from '../task_list/TaskList'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../login/loginSlice'
import { ProjectList } from '../project_list/ProjectList'

export const Dashboard = () => {
    return (
        <div className='mx-10'>
            <div className="flex">
                <div className="w-5/6">
                    <h2 className="font-bold">Dashboard</h2>
                </div>
                <span className="w-1/6 mx-auto"><img className="w-8 h-8 pt-2 float-right rounded-full border border-red-500 bg-gray-100" src={ProfileImage} alt="profile icon" /></span>
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
                        <TaskList />
                    </ul>
                </div>
            </div>
            <hr className="my-10" />
            <div>
                <div className="max-w-3xl mt-10 mb-8  mx-auto">
                    <div className="flex">
                        <h3 className="flex-grow font-semibold">Projects</h3>
                        <button className="text-sm mt-1 py-0 bg-opacity-0"><span className="flex-grow font-medium  text-right text-gray-500">View all</span></button>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto">
                    <ProjectList />
                </div>
            </div>
        </div>
    )
}