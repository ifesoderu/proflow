import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTeam } from '../../services/teamServices';
import { addTeam } from '../setup_team/teamsSlice';
import { addTeamMember } from '../../services/memberServices';
import { successAlert, neutralAlertAsync, errorAlert } from '../alert/alertSlice';
import { closeAddTeamModal } from '../side_nav/addTeamModalSlice';

export const AddTeam = () => {
    const email = localStorage.getItem('email')
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef)
    const history = useHistory()
    const dispatch = useDispatch()
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("")

    const handleAddTeamClick = (name, description) => {
        const member_email = localStorage.getItem('email')
        createTeam(name, description).then(
            res => {
                const team = res.data[0]
                dispatch(addTeam(team))
                dispatch(closeAddTeamModal())
                addTeamMember(email, team.id)
                dispatch(successAlert(res.message))
                dispatch(neutralAlertAsync())
                window.location.reload()
            },
            error => {
                dispatch(errorAlert(error.toString()))
                dispatch(neutralAlertAsync())
            }
        )
    }


    return (
        <div ref={wrapperRef} className="z-50 py-10 px-12 absolute bg-white rounded-lg" style={{ top: '6.25rem', width: '40.6rem', right: '22%', boxShadow: '0px 4px 15px #e3e3e3' }}>
            <h2 className="font-semibold text-left" style={{ marginBottom: '1.875rem' }}>New Project</h2>
            <form className="text-left">
                <div className="mb-5">
                    <div className="w-full mr-3">
                        <label className="mb-4 block text-xl" for="teamName">
                            Team Name
                        </label>
                        <input value={teamName} onChange={e => { setTeamName(e.target.value) }} className="rounded-lg border-gray-600 w-full py-4" />
                    </div>
                </div>
                <div className="mb-5">
                    <div className="w-full mr-3">
                        <label className="mb-4 block text-xl" for="teamName">
                            Team Description
                        </label>
                        <textarea value={teamDescription} onChange={e => { setTeamDescription(e.target.value) }} className="rounded-lg border border-gray-600 w-full h-20 p-4"></textarea>
                    </div>
                </div>
                <div className="ml-32">
                    <button onClick={e => { e.preventDefault(); handleAddTeamClick(teamName, teamDescription) }} className=" text-xl w-80">Create Team</button>
                </div>
            </form>
        </div>
    )
};


function useOutsideAlerter(ref) {
    const dispatch = useDispatch()
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                dispatch(closeAddTeamModal())
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        // document.getElementById('root').appendChild('div').st
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}