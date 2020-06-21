import { customFetchGet, customFetchPost } from "../utility"

// /comments/:pid
export const getProjectComments = (projectID) => {
    return customFetchGet(`/comments/${projectID}`)
}

export const postProjectComment = ({ projectID, owner_email, content }) => {
    return customFetchPost('/comment', { project_id: projectID, owner_email, content })
}
