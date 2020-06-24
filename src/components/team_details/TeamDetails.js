import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getTeam } from '../../services/teamServices';
import { getTeamProjects } from '../../services/projectServices';
import { getTeamMembers } from '../../services/memberServices';
import ProfileImage from '../../assets/img/profileImage.svg'
import AddMemberIcon from '../../assets/img/addMemberIcon.svg'
import { ProjectList } from '../project_list/ProjectList';


export const TeamDetails = () => {
    const [team, setTeam] = useState("")
    const [teamMembers, setTeamMembers] = useState([])
    const [teamProjects, setTeamProjects] = useState([])
    const [teamDescription, setTeamDescription] = useState("")
    const { teamID } = useParams();
    useEffect(() => {
        getTeam(teamID).then(
            res => {
                setTeam(res)
            }
        )
        getTeamProjects(teamID).then(
            res => {
                setTeamProjects(res)
            }
        )
        getTeamMembers(teamID).then(
            res => {
                const teamMemberEmailArr = res.map(({ member_email }) => member_email)
                setTeamMembers(teamMemberEmailArr)
            }
        )
    }, [])
    const renderTeamMembers = teamMembers => {
        teamMembers.map(teamMember => (
            <li className="my-8">{teamMember}</li>
        ))
    }
    const handleTeamDescriptionChange = e => {
        setTeamDescription(e.target.value)
    }
    return (
        <div className='px-10 pt-16 bg-white ' style={{ minHeight: '100vhs' }}>
            <div className="flex mb-20">
                <div className="w-5/6">
                    <h2 className="font-bold">{team.name}</h2>
                </div>
                <span className="w-1/6 mx-auto"><img className="w-8 h-8 pt-2 float-right rounded-full border border-red-500 bg-gray-100" src={ProfileImage} alt="profile icon" /></span>
            </div>
            <div className=" flex max-w-3xl">
                <div className="w-2/3 mr-12">
                    <div>
                        <label for="teamDescription" className="font-semibold text-gray-700">What is this team about?</label>
                        <textarea value={teamDescription} onChange={e => { handleTeamDescriptionChange(e) }} id="teamDescription" className="w-full h-24 p-5 rounded-lg border mt-6 border-gray-700"></textarea>
                    </div>
                    <div className="mt-16 ">
                        <div className="flex mb-6">
                            <span className=" text-lg text-gray-700 w-4/6 font-semibold block">Created Projects</span>
                            <div className="text-sm text-gray-700 w-2/6 font-semibold">
                                <span className="float-right"> View more</span>
                            </div>
                        </div>
                        <div className="mx-auto">
                            <ProjectList projects={teamProjects} />
                        </div>

                    </div>

                </div>
                <div className="w-1/3">
                    <span className=" text-base text-gray-700 mb-5 font-semibold block">Members</span>
                    <div>
                        <img src={AddMemberIcon} alt="add member icon" className="mr-4 h-8 w-8 inline-block" />
                        <select className="inline-block text-gray-600 ">
                            <option className="text-base" hidden={true} selected={true} disabled={true}>
                                Add member
                            </option>
                            {}
                        </select>
                        <ul>
                            {renderTeamMembers(teamMembers)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}