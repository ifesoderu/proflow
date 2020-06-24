import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getFavouriteProjects } from './favouriteProjectListSlice'
import { openAddProjectModal } from './addProjectModalSlice'
import { Project, FavouriteProjectButton } from './FavouriteProjectButton'

import AddProjectIcon from '../../assets/img/AddProjectIcon.svg';

export const ProjectList = ({ projects }) => {
    const dispatch = useDispatch()

    const handleAddProject = () => {
        dispatch(openAddProjectModal())
    }

    return (
        <ul className="flex -m-4 flex-wrap">
            <li className="w-32 m-6">
                <button onClick={() => { handleAddProject() }} className="p-0 bg-opacity-0">
                    <img src={AddProjectIcon} alt="add project" />
                </button>
                <span className="text-sm block mx-auto text-center font-semibold text-gray-600">New Project</span>
            </li>
            {Object.keys(projects).map((projectIdex, index) => {
                return (
                    <FavouriteProjectButton project={projects[projectIdex]} />
                )
            })}
        </ul >
    )
}