import { customFetchGet, customFetchUpdate, customFetchPost, customFetchDelete } from "../utility"
import { successAlert, neutralAlert } from "../components/alert/alertSlice"

// tasks/:pid/:sid
export const getTasksBySectionsAndProjectId = (projectID) => customFetchGet(`/tasks/${projectID}`)

// tasks/:email
export const getPersonalTasks = memberEmail => customFetchGet(`/personaltasks/${memberEmail}`)

// tasksbyids/:email
export const getTasksByIds = memberEmail => customFetchGet(`/tasksbyids/${memberEmail}`)

// task/:id
export const getTaskById = (taskID) => customFetchGet(`/task/${taskID}`)


// UPDATE 

// task
export const updateTask = (task) => customFetchUpdate(`/task`, task)


// POST 

// task
export const postTask = ({ title, description, completed, due_date, section_id, project_id }) => customFetchPost(`/task`, { title, description, completed, due_date, section_id, project_id });


export const deleteTask = (id) => customFetchDelete(`/task`, { id });

export const unAssignMember = (member_email, task_id) => customFetchDelete(`/assignedmember`, { member_email, task_id })



