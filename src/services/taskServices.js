import { customFetchGet, customFetchUpdate } from "../utility"
import { successAlert, neutralAlert } from "../components/alert/alertSlice"

// tasks/:pid/:sid
export const getTasksBySectionsAndProjectId = (projectID) => customFetchGet(`/tasks/${projectID}`)

// tasks/:email
export const getPersonalTasks = memberEmail => customFetchGet(`/personaltasks/${memberEmail}`)

// tasksbyids/:email
export const getTasksByIds = memberEmail => customFetchGet(`/tasksbyids/${memberEmail}`)

// task/:id
export const getTaskById = (taskID) => customFetchGet(`/task/${taskID}`)


// UPDATE TASKS

// task
export const updateTask = (task) => customFetchUpdate(`/task`, task)
