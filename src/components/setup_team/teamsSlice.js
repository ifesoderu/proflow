// import {} from 

const { createSlice } = require("@reduxjs/toolkit");

const arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
        obj[item[keyField]] = item
        return obj
    }, {})

export const teamsSlice = createSlice({
    name: "teams",
    initialState: {},
    reducers: {
        getTeams: {
            reducer: (state, action) => action.payload,
            prepare: (value) => {
                return { payload: arrayToObject(value, 'id') }
            }
        },
        addTeam: (state, action) => {
            state[action.payload.id] = action.payload
        },
        editTeam: (state, action) => (
            state[action.payload.id] = action.payload.editedCopy
        ),
        deleteTeam: (state, action) => delete state[action.payload.id]
    }
})

export const { getTeams, addTeam, editTeam, deleteTeam } = teamsSlice.actions

export const selectTeams = state => state.teams;


export default teamsSlice.reducer;