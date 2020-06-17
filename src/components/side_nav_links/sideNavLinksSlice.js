import { useSelector } from "react-redux"
import { selectTeams, teamsSlice } from "../setup_team/teamsSlice"

const { createSlice } = require("@reduxjs/toolkit")



export const sideNavLinksSlice = createSlice({
    name: "sideNavLinks",
    initialState: useSelector(selectTeams),
    reducers: {

    },
    extraReducers: {
        [teamsSlice.actions.addTeam]: (state, action) => {
            state[action.payload.id] = action.payload
        }
    }
})