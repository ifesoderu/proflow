import { customFetchGet, customFetchPost, customFetchDelete, customFetchUpdate } from "../utility"

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

export const addToFavourited = ({ project_id, member_email }) => customFetchPost(`/favouriteproject`, { project_id, member_email })

export const deleteFromFavourited = ({ project_id, member_email }) => customFetchDelete(`/unfavouriteproject`, { project_id, member_email })
export const deleteProject = ({ project_id }) => customFetchDelete(`/project`, { project_id })

export const updateProject = ({ project_id, name, description, status, privacy }) => customFetchUpdate(`/project`, { project_id, name, description, status, privacy });







