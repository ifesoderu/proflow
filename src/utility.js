import { successAlert, neutralAlert } from "./components/alert/alertSlice";

export const api_url = 'http://localhost:3001';
// export const api_url = 'https://sheltered-ocean-44271.herokuapp.com';

export const handleResponse = (res) => (res.json())

export const checkResponse = (res, body, onSuccess) => {
    console.log(res)
    if (!res.success) {
        throw new Error(res.message)
    } else {
        if (typeof onSuccess === 'function') {
            onSuccess(res, body);
        }
        return res.data
    }
}

export const customFetchGet = (path) => {
    return fetch(`${api_url}${path}`)
        .then(handleResponse)
        .then(checkResponse)
}

export const customFetchPost = (path, body, onSuccess) => {
    return fetch(`${api_url}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...body })
    })
        .then(handleResponse)
        .then(res => {
            checkResponse(res, body, onSuccess)
        })
}

export const customFetchUpdate = (path, body, onSuccess) => {
    return fetch(`${api_url}${path}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...body })
    })
        .then(handleResponse)
}

export const arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
        obj[item[keyField]] = item
        return obj
    }, {})