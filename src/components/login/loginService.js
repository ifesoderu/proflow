export const loginPostRequest = (email, password) => {
    return fetch('https://sheltered-ocean-44271.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(res => res.json()).then(res => {
        if (!res.success) throw new Error(res.message)
        if (res.success) {
            localStorage.setItem('token', res.data)
            return res.data
        }
    })
}

