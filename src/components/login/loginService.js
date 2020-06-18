import { customFetchPost } from "../../utility"

export const loginPostRequest = (email, password) => customFetchPost('/login', { email, password }, (res, body) => { localStorage.setItem('email', body.email); localStorage.setItem('token', res.data) })

