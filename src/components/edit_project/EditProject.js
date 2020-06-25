import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { closeEditProjectModal } from '../project_details/editProjectModalSlice';
import { updateProject } from '../../services/projectServices';
import { editOpenProject } from '../project_details/openedProjectSlice';

export const EditProject = () => {
    const email = localStorage.getItem('email')
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef)
    const history = useHistory()
    const dispatch = useDispatch()
    const openedProject = useSelector(state => state.openedProject)
    const [projectName, setProjectName] = useState(openedProject.name)
    const [projectDesctiption, setProjectDesctiption] = useState(openedProject.description)

    const handleEditProjectClick = (name, description) => {
        updateProject({ ...openedProject, name, description }).then(
            res => {
                dispatch(editOpenProject(res.data[0]))
                dispatch(closeEditProjectModal())
            }
        )
    }

    return (
        <div ref={wrapperRef} className="z-50 py-10 px-12 absolute bg-white rounded-lg" style={{ top: '6.25rem', width: '40.6rem', right: '22%', boxShadow: '0px 4px 15px #e3e3e3' }}>
            <h2 className="font-semibold text-left" style={{ marginBottom: '1.875rem' }}>Edit Project</h2>
            <form className="text-left">
                <div className="mb-5">
                    <div className="w-full mr-3">
                        <label className="mb-4 block text-xl" for="teamName">
                            Project Name
                        </label>
                        <input value={projectName} onChange={e => { setProjectName(e.target.value) }} className="rounded-lg border-gray-600 w-full py-4" />
                    </div>
                </div>
                <div className="mb-5">
                    <div className="w-full mr-3">
                        <label className="mb-4 block text-xl" for="teamName">
                            Project Description
                        </label>
                        <textarea value={projectDesctiption} onChange={e => { setProjectDesctiption(e.target.value) }} className="rounded-lg border border-gray-600 w-full h-20 p-4"></textarea>
                    </div>
                </div>
                <div className="ml-32">
                    <button onClick={e => { e.preventDefault(); handleEditProjectClick(projectName, projectDesctiption) }} className=" text-xl w-80">Save Changes</button>
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
                dispatch(closeEditProjectModal())
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