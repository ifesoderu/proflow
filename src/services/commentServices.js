import { customFetchGet } from "../utility"

// /comments/:pid
export const getProjectComments = (projectID) => {
    return customFetchGet(`/comments/${projectID}`)
}