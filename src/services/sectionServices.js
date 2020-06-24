import { customFetchGet, customFetchPost, customFetchUpdate, customFetchDelete } from "../utility"

// /sections/:pid
export const getProjectSections = (projectID) => customFetchGet(`/sections/${projectID}`)

// /section/:id
export const getSection = (sectionID) => customFetchGet(`/section/${sectionID}`)

// /section
export const postSection = ({ name, projectID: project_id }) => customFetchPost(`/section`, { name, project_id })


// /section
export const updateSection = ({ id, sectionTitle: name }) => customFetchUpdate(`/section`, { id, name });

export const deleteSection = (id) => customFetchDelete('/section', { id })