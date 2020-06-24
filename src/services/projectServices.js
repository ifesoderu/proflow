import { customFetchGet, customFetchPost } from "../utility"

// /project/:id
export const getProjectById = projectID => customFetchGet(`/project/${projectID}`)

// /teamprojects/:id
export const getTeamProjects = teamID => customFetchGet(`/teamprojects/${teamID}`)

// /projects
export const getAllProjects = () => customFetchGet(`/projects`)

// /favouritedprojects/:email
export const getFavouritedProjects = memberEmail => customFetchGet(`/favouritedprojects/${memberEmail}`)

// /memberprojects/:email
export const getMemberProjects = memberEmail => customFetchGet(`/memberprojects/${memberEmail}`)

// /project/
export const addNewProjects = ({ name, description, team_id, status, creator_email, privacy, board }) => customFetchPost(`/project`, { name, description, team_id, status: "on track", creator_email, privacy, board })


