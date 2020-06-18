const { customFetchGet } = require("../../utility")

export const getTeams = () => customFetchGet('/teams');