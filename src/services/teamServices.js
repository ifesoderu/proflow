const { customFetchGet } = require("../utility")

export const getTeams = () => customFetchGet('/teams');

export const getTeam = (id) => customFetchGet(`/team/${id}`);

export const getJoinedTeams = memberEmail => customFetchGet(`/joinedteams/${memberEmail}`)