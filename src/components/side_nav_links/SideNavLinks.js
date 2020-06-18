import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { selectTeams, teamsSlice } from "../setup_team/teamsSlice"
import { getTeams } from './sideNavLinksService'
import TeamStatusDefault from '../../assets/img/TeamStatusDefault.svg'


export const SideNavLinks = ({ routes }) => {
    const [showMoreProjects, setShowMoreProjects] = useState({})
    const teams = useSelector(state => state.teams);

    const dispatch = useDispatch()

    useEffect(() => {
        getTeams().then((data) => {
            dispatch(teamsSlice.actions.getTeams(data))
        })
    }, [])

    return (
        <div>
            <ul className="mb-16">
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
                {Object.keys(teams).map((teamIndex, index) => {
                    return (
                        <li className="text-xl mb-8">
                            <NavLink
                                className={"w-full block pl-12 text-white font-semibold "}
                                activeClassName="bg-opacity-50 bg-black"
                                to={`/teams/${index}`}
                            >
                                <span className="inline-block mr-3"><img src={TeamStatusDefault} alt="active team" /></span>
                                {teams[teamIndex].name}
                            </NavLink>
                            <div>
                                {[{ name: 'Develop Proflow' }, { name: 'Develop Proflow' }, { name: 'Develop Proflow' }, { name: 'Develop Proflow' }].map((project, index) => {
                                    if (!showMoreProjects[index] && index === 3) {
                                        return undefined
                                    };
                                    return (
                                        <NavLink
                                            to={`/projects/${index}`}
                                            className="text-sm py-1 pl-20 pr-25"
                                            activeClassName='bg-opacity-50 bg-black'
                                        >
                                            <span className={`inline-block h-2 w-2 mr-3 rounded-lg ${window.location.pathname === '/projects/' + index ? 'bg-teal-400' : 'bg-gray-400'}`}></span>
                                            {project.name}
                                        </NavLink>
                                    )
                                })}
                            </div>
                            {[{ name: 'Develop Proflow' }, { name: 'Develop Proflow' }, { name: 'Develop Proflow' }, { name: 'Develop Proflow' }].length > 3 && showMoreProjects[index] === undefined && < button className="text-xs font-semibold py-0 pl-16 text-white" onClick={() => { setShowMoreProjects({ ...showMoreProjects, [index]: true }) }}>Show more projects</button>}
                            {
                                [].length > 0 && <div className="text-base pl-16 text-white">
                                    + Create Project
                            </div>
                            }
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}