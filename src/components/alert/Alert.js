import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectAlert } from './alertSlice';


export const Alert = () => {
    const { type, message } = useSelector(selectAlert)

    return (
        <div className="animate__animated animate__slideInLeft">
            {type === 'error' && <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-semibold">{message}</strong>
            </div>}
            {type === 'success' && <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-semibold">{message}</strong>
            </div>}
        </div>
    )
}

