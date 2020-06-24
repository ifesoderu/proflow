import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../setup_team/teamsSlice';
// import { addNewProjects } from '../../services/projectServices';
import { useHistory } from 'react-router-dom';
import { successAlert } from '../alert/alertSlice';
import { closeEditTaskModal } from '../project_board/editTaskModalSlice';
import AddDueDateIcon from '../../assets/img/addDueDateIcon.svg'
import { updateTask } from '../../services/taskServices';
import { editTask } from '../project_board/loadedTasksSlice';
import { getTeamMembers, assignMemberToTask } from '../../services/memberServices';

export const EditTask = ({ task }) => {
    const { id, title, description, completed, due_date, section_id, memberEmails } = task;
    const storedEmail = localStorage.getItem('email')

    const [isComplete, setIsComplete] = useState(completed)
    const [dueDate, setDueDate] = useState(due_date)
    const [taskDescription, setTaskDescription] = useState(description)
    const [taskTitle, setTaskTitle] = useState(title)
    const [showDueDateInput, setShowDueDateInput] = useState(due_date)
    const [teamMembers, setTeamMembers] = useState([])
    const [assignedMembers, setAssignedMembers] = useState(memberEmails)

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef)
    const history = useHistory()
    const dispatch = useDispatch()
    const teamIDofOpenedProject = useSelector(state => state.teamIDofOpenedProject)

    useEffect(() => {
        console.log(teamIDofOpenedProject)
        getTeamMembers(teamIDofOpenedProject).then(
            res => {
                const teamMemberEmailArr = res.map(({ member_email }) => member_email)
                setTeamMembers(teamMemberEmailArr)
            }
        )
    }, [])

    const handleTaskUpdate = (id, task) => {
        const { taskTitle, taskDescription, dueDate, isComplete, section_id } = task
        const updatedTask = {
            id,
            title: taskTitle,
            description: taskDescription,
            completed: isComplete,
            due_date: dueDate,
            section_id

        }

        updateTask(updatedTask).then(
            res => {
                dispatch(editTask(res.data))
            }
        )
    }

    const handleDeleteMemberEmail = () => {

    }

    const handleAssignMember = (e, id) => {
        e.preventDefault();
        assignMemberToTask(e.target.value, id).then(
            res => {
                setAssignedMembers([...assignedMembers, res.data[0]])
            }
        )
    }

    return (
        <div ref={wrapperRef} className="z-50 py-10 px-12 absolute bg-white rounded-lg" style={{ top: '6.25rem', width: '50rem', right: '22%', boxShadow: '0px 4px 15px #e3e3e3' }}>
            <div className="flex mb-8">
                <div className="mr-4  w-4/6">
                    <input value={taskTitle} onChange={e => { setTaskTitle(e.target.value) }} onBlur={() => { handleTaskUpdate(id, { taskTitle, taskDescription, dueDate, isComplete, section_id }) }} className="text-1xl text-black border-none focus:outline-none focus:shadow-none font-bold" style={{ backgroundColor: '#fff' }} />
                </div>
                <div className="w-2/6">
                    <button onClick={e => { e.preventDefault(); setIsComplete(!isComplete) }} className={`${isComplete ? 'bg-white text-primaryred' : 'bg-primaryred text-white'} border float-right border-primaryred  text-sm py-2 px-2`}>
                        {!isComplete ? 'Mark as Complete' : 'Mark as incomplete'}
                    </button>
                </div>
            </div>
            <div className="flex justify-start mb-8">
                <div className="w-1/2">
                    <span className="text-xm font-semibold mb-2 block">Assigned to</span>
                    <div>
                        <div className="block flex mb-3">
                            {assignedMembers.map(memberEmail => (
                                <button onClick={() => { handleDeleteMemberEmail() }} value={memberEmail} className="p-0 p-1 rounded-lg text-xs">{memberEmail}X</button>
                            ))}
                        </div>
                        <select
                            onChange={e => { handleAssignMember(e, id) }}
                            className="block border border-gray-600 p-3 rounded-lg"
                        >
                            <option selected="selected" hidden={true} disabled={true}>Assign a member to this task</option>
                            {/* {teamMembers.map(teamMember => ( */}
                            {teamMembers.filter(email => !assignedMembers.includes(email)).map(teamMember => (
                                <option value={teamMember}>{teamMember}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div onClick={() => setShowDueDateInput(true)} className="flex items-center w-1/2 bg-opacity-0">
                    <span className="w-2/5 mr-3"><img src={AddDueDateIcon} alt="add due date" className="float-right h-8" /></span>
                    {showDueDateInput && < input placeholder="Enter Due Date" value={dueDate} className='focus:outline-none h-12 flex-grow' onChange={e => { setDueDate(e.target.value) }} />}
                </div>
            </div>
            <div className="flex mb-5">
                <div className="w-full">
                    <label className="mb-4 block text-sm" for="description">
                        Task Description
                    </label>
                    <textarea id="description" value={taskDescription} onChange={e => { setTaskDescription(e.target.value) }} className="rounded-lg w-full border border-gray-800 h-24 p-5" />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <button onClick={() => { handleTaskUpdate(id, { taskTitle, taskDescription, dueDate, isComplete, section_id }); dispatch(closeEditTaskModal()) }} className="w-80 py-3">Save</button>
            </div>
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
                dispatch(closeEditTaskModal())
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