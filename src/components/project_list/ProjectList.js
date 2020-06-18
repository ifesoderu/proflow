import React, { useEffect } from 'react'
import { getFavouritedProjects } from '../../services/projectServices'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFavouriteProjects } from './favouriteProjectListSlice'
import { openAddProjectModal } from './addProjectModal'
import { Project, FavouriteProjectButton } from './FavouriteProjectButton'

import AddProjectIcon from '../../assets/img/AddProjectIcon.svg'



export const ProjectList = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const favouriteProjects = useSelector(state => state.favouriteProjects)
    useEffect(() => {
        const email = localStorage.getItem('email')
        if (!email) { history.push('/login') }
        getFavouritedProjects(email).then(data => { dispatch(getFavouriteProjects(data)) })
    }, [])

    const handleAddProject = () => {
        dispatch(openAddProjectModal())
    }

    return (
        <ul className="flex flex-wrap">
            <li className="w-32">
                <button className="p-0 bg-opacity-0">
                    <img src={AddProjectIcon} alt="add project" />
                </button>
                <span className="text-sm block mx-auto text-center font-semibold text-gray-600">New Project</span>
            </li>
            {Object.keys(favouriteProjects).map((projectIdex, index) => {
                return (
                    <FavouriteProjectButton project={favouriteProjects[projectIdex]} handleAddProject={handleAddProject} />
                )
            })}
        </ul >
    )
}