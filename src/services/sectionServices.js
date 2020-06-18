import { customFetchGet } from "../utility"

// /sections/:pid
export const getProjectSections = (projectID) => customFetchGet(`/sections/${projectID}`)

// /section/:id
export const getSection = (sectionID) => customFetchGet(`/section/${sectionID}`)