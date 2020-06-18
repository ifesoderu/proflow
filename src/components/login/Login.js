import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ProflowFullLogo from '../../assets/img/ProflowFullLogo.svg'
import authImage from '../../assets/img/authImage.svg'
import { loginPostRequest } from './loginService'
import { loginRequest, loginFailure, loginSuccess, logout, selectAuth } from './loginSlice'
import { authCompleted, authNotCompleted } from './isLoginRouteSlice'
import { neutralAlertAsync } from '../alert/alertSlice'
import { useHistory } from 'react-router-dom';
export const Login = (store) => {
    const auth = useSelector(selectAuth)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSignInSubmit = () => {
        dispatch(loginRequest({ email }))
        loginPostRequest(email, password).then(
            (data) => {
                console.log(data)
                dispatch(loginSuccess({ email, data }))
                dispatch(neutralAlertAsync())
                dispatch(authCompleted())
                history.push('/dashboard');
            },
            error => {
                dispatch(loginFailure(error.toString()))
                dispatch(neutralAlertAsync())

            }
        )
    }
    return (
        <div className="flex h-screen">
            <div className="w-full md:w-2/5">
                <div className="w-full max-w-xs mx-auto">
                    <div className="my-8"><img src={ProflowFullLogo} alt="proflow logo" /></div>
                    <div className="mb-7.5" >
                        <h2 className="font-bold text-gray-800">Sign In</h2>
                        <span className="font-semibold text-gray-700 text-sm">Welcome to ProFlow</span>
                    </div>
                    <form className="h-14" >
                        <div class="mb-6">
                            <label className="block text-black text-sm font-medium mb-3" htmlFor="email">
                                Email
                            </label>
                            <input class="w-80" id="email" type="email" placeholder="Email" value={email} onChange={e => { setEmail(e.target.value) }} />
                        </div>
                        <div class="mb-8">
                            <label className="block text-black text-sm font-medium mb-3" htmlFor="password">
                                Password
                            </label>
                            <input className="w-80" id="password" type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value) }} />
                        </div>
                        <button
                            className="hover:bg-red-600 focus:outline-none px-33.56"
                            type="button"
                            onClick={e => {
                                e.preventDefault();
                                handleSignInSubmit()
                            }}>
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
            <div
                className="md:flex-auto bg-local"
                style={{
                    backgroundImage: `url(${authImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            >
            </div>
        </div>
    )
}