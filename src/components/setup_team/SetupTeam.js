import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addTeam, editTeam, deleteTeam } from './teamsSlice'
import ScrumBoardImage from '../../assets/img/ScrumBoardImage.svg'
import { addFirstTeam } from './setupTeamService'
import { successAlert, errorAlert, neutralAlertAsync } from '../alert/alertSlice'
import { data } from 'autoprefixer'



export const SetupTeam = () => {
    const [name, setName] = useState('')

    const dispatch = useDispatch();

    const handleAddFirstTeam = e => {
        addFirstTeam(name).then(
            ({ message, data }) => {
                const { id, name } = data[0]
                dispatch(addTeam({ id, name }))
                dispatch(successAlert(message))
                dispatch(neutralAlertAsync())
            },
            error => {
                dispatch(errorAlert(error.toString()))
                dispatch(neutralAlertAsync())
            }
        )
    }

    return (
        <div className="mx-auto max-w-smd">
            <div className="mt-20 mb-13.5">
                <img src={ScrumBoardImage} alt="Scrum board" />
            </div>
            <div className='text-left mb-5'>
                <h2 className="font-semibold">What is the name of your team?</h2>
                <span>You can edit this later, we want to use it to set up your account</span>
            </div>
            <input className="max-w-smd mb-6" type='text' value={name} onChange={e => { e.preventDefault(); setName(e.target.value) }} />
            <div className="mx-auto text-center mb-10">
                <button
                    className="px-33.56"
                    onClick={e => {
                        e.preventDefault();
                        handleAddFirstTeam()
                    }}>
                    Create Team
                </button>
            </div>
        </div>
    )
}