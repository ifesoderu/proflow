const { customFetchGet, customFetchPost } = require("../utility")

export const getTeams = () => customFetchGet('/teams');

export const getTeam = (id) => customFetchGet(`/team/${id}`);

export const getJoinedTeams = memberEmail => customFetchGet(`/joinedteams/${memberEmail}`);

export const createTeam = (name, description) => customFetchPost(`/team`, { name, description });