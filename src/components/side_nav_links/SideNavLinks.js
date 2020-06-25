import React, { useState, useEffect } from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { selectTeams, teamsSlice } from "../setup_team/teamsSlice"
import { getTeams, getJoinedTeams } from '../../services/teamServices'
import { getJoinedTeamsAction } from '../side_nav/joinedTeamsSlice'
import TeamStatusDefault from '../../assets/img/TeamStatusDefault.svg'
import { getJoinedProjects } from '../side_nav/joinedTeamProjectsSlice'
import { openAddProjectModal } from '../project_list/addProjectModalSlice'
import { openAddTeamModal } from '../side_nav/addTeamModalSlice'

export const SideNavLinks = ({ routes }) => {
    const [showMoreProjects, setShowMoreProjects] = useState({})


    const teams = useSelector(state => state.teams);
    const joinedTeams = useSelector(state => state.joinedTeams)
    const joinedTeamsProjects = useSelector(state => state.joinedTeamsProjects)

    const dispatch = useDispatch()

    useEffect(() => {
        const email = localStorage.getItem('email')
        getTeams().then(
            (data) => {
                dispatch(teamsSlice.actions.getTeams(data))
            }
        )
        getJoinedTeams(email).then(
            (data) => {
                dispatch(getJoinedTeamsAction(data.teamIDs))
                dispatch(getJoinedProjects(data.teamProjects))
            }
        )
    }, [])

    console.log(teams)
    console.log(joinedTeams)

    return (
        <div>
            <ul className="mb-16 text-xl">
                <li>
                    <NavLink className={"w-full block py-3 pl-12 pr-40"} activeClassName="bg-opacity-50 bg-black" to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink className={"py-3 block pl-12 pr-40"} activeClassName="bg-opacity-50 bg-black" to="/tasks">My Tasks</NavLink>
                </li>
            </ul>
            <hr className="bg-opacity-50 border-red-300" />
            <ul className="mt-6">
                <span className={"w-full block mb-3 pl-12 pr-40 text-lg text-red-300 font-bold"}>Teams</span>
                {Object.keys(teams).filter(id => joinedTeams.includes(parseInt(id, 10))).map((teamIndex, index) => {
                    return (
                        <li className="text-xl mb-8">
                            <NavLink
                                className={"w-full block pl-12 text-white font-semibold "}
                                activeClassName="bg-opacity-50 bg-black"
                                to={`/team/${teamIndex}`}
                            >
                                <span className="inline-block mr-3"><img src={TeamStatusDefault} alt="active team" /></span>
                                {teams[teamIndex].name}
                            </NavLink>
                            <div>
                                {joinedTeamsProjects.filter(({ team_id }) => team_id === parseInt(teamIndex, 10)).map(({ name, project_id }, index) => {
                                    return (
                                        <NavLink
                                            to={`/project/${project_id}`}
                                            className="text-sm py-1 pl-20 pr-10 block"
                                            activeClassName='bg-opacity-50 bg-black'
                                        >
                                            <span className={`inline-block h-2 w-2 mr-3 rounded-lg ${window.location.pathname === '/project/' + project_id ? 'bg-teal-400' : 'bg-teal-400'}`}></span>
                                            {name.substr(0, 20)}{name.length > 20 && '...'}
                                        </NavLink>
                                    )
                                })}
                            </div>
                            {/* {[{ name: 'Develop Proflow' }, { name: 'Develop Proflow' }, { name: 'Develop Proflow' }, { name: 'Develop Proflow' }].length > 3 && showMoreProjects[index] === undefined && < button className="text-xs font-semibold py-0 pl-16 text-white" onClick={() => { setShowMoreProjects({ ...showMoreProjects, [index]: true }) }}>Show more projects</button>} */}
                            {
                                joinedTeamsProjects.filter(({ team_id }) => team_id === parseInt(teamIndex, 10)).length === 0 && <div onClick={() => { dispatch(openAddProjectModal()) }} className=" cursor-pointer text-base pl-12 text-white">
                                    + Create Project
                            </div>
                            }
                        </li>
                    )
                })}
                <li className="text-base pl-12 mb-8">
                    <button onClick={() => { dispatch(openAddTeamModal()) }} className="p-1">+ Add Team</button>
                </li>
            </ul>
        </div >
    )
}