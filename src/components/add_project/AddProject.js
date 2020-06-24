import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeAddProjectModal } from '../project_list/addProjectModalSlice';
import { getTeams } from '../setup_team/teamsSlice';
import { addNewProjects } from '../../services/projectServices';
import { useHistory } from 'react-router-dom';
import { successAlert } from '../alert/alertSlice';

export const AddProject = () => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef)
    const history = useHistory()
    const dispatch = useDispatch()
    const teams = useSelector(state => state.teams)
    const creatorEmail = localStorage.getItem('email');

    const [projectName, setProjectName] = useState('')
    const [teamID, setTeamID] = useState('');
    const [projectDescription, setProjectDescription] = useState('')
    const [projectPrivacy, setProjectPrivacy] = useState(null)

    if (!creatorEmail) { history.push('/login'); return; }

    const handleAddProjectClick = (projectName, projectDescription, teamID, creatorEmail, projectPrivacy) => {
        console.log({ projectName, projectDescription, team_id: parseInt(teamID, 10), creatorEmail, projectPrivacy })

        addNewProjects({
            name: projectName,
            description: projectDescription,
            team_id: parseInt(teamID, 10),
            status: "on track",
            creator_email: creatorEmail,
            privacy: projectPrivacy,
            board: 'Board'
        }).then(
            res => {
                console.log(res)
                dispatch(successAlert(res.message))
                dispatch(closeAddProjectModal())
            }
        )
    }
    return (
        <div ref={wrapperRef} className="z-50 py-10 px-12 absolute bg-white rounded-lg" style={{ top: '6.25rem', width: '40.6rem', right: '22%', boxShadow: '0px 4px 15px #e3e3e3' }}>
            <h2 className="font-semibold text-left" style={{ marginBottom: '1.875rem' }}>New Project</h2>
            <form className="text-left">
                <div className="flex mb-5">
                    <div className="w-1/2 mr-3">
                        <label className="mb-4 block text-xl" for="projectName">
                            Project Name
                    </label>
                        <input value={projectName} onChange={e => { setProjectName(e.target.value) }} className="rounded-lg w-full py-4" />
                    </div>
                    <div className="w-1/2">
                        <label className="mb-4 block text-xl" for="team">
                            Select Team
                    </label>
                        <select id="team" onChange={e => { e.preventDefault(); setTeamID(e.target.value) }} className="rounded-lg border text-xl w-full p-3">
                            {Object.values(teams).map(team => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex mb-5">
                    <div className="w-1/1 mr-3">
                        <label className="mb-4 block text-xl" for="description">
                            What is this project about?
                    </label>
                        <input id="description" value={projectDescription} onChange={e => { setProjectDescription(e.target.value) }} className="rounded-lg w-full py-4" />
                    </div>
                    {/* <div className="w-1/3">
                    </div> */}
                </div>
                <div className="mb-5">
                    <div className="w-2/3 mr-3">
                        <label className="mb-4 block text-xl" for="projectName">
                            Who can see this project?
                    </label>
                        <div className="flex mb-16">
                            <div className="w-1/3 mr-6">
                                <button onClick={e => { e.preventDefault(); setProjectPrivacy('public') }} className={`rounded-lg w-32  p-3 ${projectPrivacy === 'public' ? 'bg-primaryred text-white' : 'bg-white text-primaryred border border-primaryred'}`}>
                                    All
                                </button>
                            </div>
                            <div className="w-1/3 mr-6">
                                <button onClick={e => { e.preventDefault(); setProjectPrivacy('team') }} className={`rounded-lg w-32  p-3 ${projectPrivacy === 'team' ? 'bg-primaryred text-white' : 'bg-white text-primaryred border border-primaryred'}`}>
                                    Some
                                </button>
                            </div>
                            <div className="w-1/3">
                                <button onClick={e => { e.preventDefault(); setProjectPrivacy('private') }} className={`rounded-lg w-32  p-3 ${projectPrivacy === 'private' ? 'bg-primaryred text-white' : 'bg-white text-primaryred border border-primaryred'}`}>
                                    Me
                                </button>
                            </div>
                        </div>
                        <div className="ml-32">
                            <button onClick={e => { e.preventDefault(); handleAddProjectClick(projectName, projectDescription, teamID, creatorEmail, projectPrivacy) }} className=" text-xl w-80">Creat Project</button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    )
}

function useOutsideAlerter(ref) {
    const dispatch = useDispatch()
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                dispatch(closeAddProjectModal())
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