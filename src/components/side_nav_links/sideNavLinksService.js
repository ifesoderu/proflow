const { api_url } = require("../../utility")

export const getTeams = () => {
    return fetch(api_url + '/teams')
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res
        })
}