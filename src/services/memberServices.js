import { customFetchGet, customFetchPost } from "../utility";

export const getAssignedMembers = taskID => Promise.resolve(customFetchGet(`/assignedmembers/${taskID}`))


export const getTeamMembers = teamID => Promise.resolve(customFetchGet(`/teammembers/${teamID}`))

export const assignMemberToTask = (member_email, task_id) => customFetchPost(`/assignmember`, { member_email, task_id })

export const addTeamMember = (member_email, team_id) => customFetchPost(`/teammember`, { member_email, team_id })

export const getAllMembers = () => customFetchGet(`/members`)