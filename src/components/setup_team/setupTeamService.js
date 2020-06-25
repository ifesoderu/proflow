import { api_url } from "../../utility";

export const addFirstTeam = (name, member_email) => {
    return fetch(`${api_url}/team`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name,
            member_email
        })
    }).then(res => res.json()).then(res => {
        if (!res.success) throw new Error(res.message)
        if (res.success) {
            return res
        }
    })
};

export const getTeams = () => {
    return fetch(api_url + '/teams')
        .then(res => res.json())
        .then(res => {
            return res
        })
}