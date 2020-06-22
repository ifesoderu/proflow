import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { openAddProjectModal } from './addProjectModalSlice';
import KanbanIcon from '../../assets/img/KanbanIcon.svg'
import { Link } from 'react-router-dom';

export const FavouriteProjectButton = ({ project }) => {
    const dispatch = useDispatch();

    return (
        <li className="w-32 ml-12">
            <Link className=" py-10 rounded-lg block mb-5 w-full h-32 bg-red-600" to={`/project/${project.project_id}`}>
                <img src={KanbanIcon} className="mx-auto" alt="Kanban Icon" />
            </Link>
            <span className=" text-sm block mx-auto text-center font-semibold">{project.name}</span>
        </li>
    )
}