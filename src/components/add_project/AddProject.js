import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeAddProjectModal } from '../project_list/addProjectModalSlice';
import { getTeams } from '../setup_team/teamsSlice';

export const AddProject = () => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef)
    const teams = useSelector(state => state.teams)
    return (
        <div ref={wrapperRef} className="z-50 py-10 px-12 absolute bg-white rounded-lg" style={{ top: '6.25rem', width: '40.6rem', right: '22%', boxShadow: '0px 4px 15px #e3e3e3' }}>
            <h2 className="font-semibold text-left" style={{ marginBottom: '1.875rem' }}>New Project</h2>
            <form className="text-left">
                <div className="flex">
                    <div className="w-1/2 mr-3">
                        <label className="mb-4 block text-xl" for="projectName">
                            Project Name
                    </label>
                        <input className="rounded-lg w-full p-3" />
                    </div>
                    <div className="w-1/2">
                        <label className="mb-4 block text-xl" for="Team">
                            Select Team
                    </label>
                        <select className="rounded-lg border text-xl w-full p-3">
                            {Object.values(teams).map(team => (
                                <option key={team.id} value={team.name}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2 mr-3">
                        <label className="mb-4 block text-xl" for="projectName">
                            How do you want the task to show?
                    </label>
                        <button className="rounded-lg w-full p-3">
                            Board
                        </button>
                    </div>
                    <div className="w-1/2">
                        <label className="mb-4 block text-xl" for="Team">
                            Select Team
                    </label>
                        <select className="rounded-lg border text-xl w-full p-3">
                            {Object.values(teams).map(team => (
                                <option key={team.id} value={team.name}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
        </div>
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