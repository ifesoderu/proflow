import { successAlert, neutralAlert } from "./components/alert/alertSlice";

// export const api_url = 'http://localhost:3001';
export const api_url = 'https://sheltered-ocean-44271.herokuapp.com';

export const handleResponse = (res) => (res.json())

export const checkResponse = (res, body, onSuccess) => {
    if (!res.success) {
        if (res.message === "Unauthorized") {
            window.localStorage.removeItem('email')
            window.localStorage.removeItem("token")
            window.location.pathname = '/login';
        } else {
            throw new Error(res.message)
        }
    } else {
        if (typeof onSuccess === 'function') {
            onSuccess(res, body);
        }
        return res.data
    }
}

export const customFetchGet = (path) => {
    const token = window.localStorage.getItem('token')
    const email = window.localStorage.getItem('email')

    return fetch(`${api_url}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'useremail': email
        }
    })
        .then(handleResponse)
        .then(checkResponse)
}


export const customFetchPost = (path, body, onSuccess) => {
    const token = window.localStorage.getItem('token');
    const email = window.localStorage.getItem('email')

    return fetch(`${api_url}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'useremail': email

        },
        body: JSON.stringify({ ...body })
    })
        .then(handleResponse)
    // .then(res => {
    //     checkResponse(res, body, onSuccess)
    // })
}



export const customFetchUpdate = (path, body, onSuccess) => {
    const token = window.localStorage.getItem('token');
    const email = window.localStorage.getItem('email')

    return fetch(`${api_url}${path}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'useremail': email

        },
        body: JSON.stringify({ ...body })
    })
        .then(handleResponse)
};

export const customFetchDelete = (path, body, onSuccess) => {
    const token = window.localStorage.getItem('token')
    const email = window.localStorage.getItem('email')

    return fetch(`${api_url}${path}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'useremail': email
        },
        body: JSON.stringify({ ...body })
    })
        .then(handleResponse)
}

export const arrayToObject = (array, keyField) => (
    array.reduce((obj, item) => {
        obj[item[keyField]] = item
        return obj
    }, {}))

export default function debounce(callback, wait) {
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
}