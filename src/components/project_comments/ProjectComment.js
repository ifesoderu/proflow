import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export const ProjectComment = ({ content }) => {
    const [showTime, setShowTime] = useState(false)
    const dispatch = useDispatch()
    return (
        <div className={`mb-3 text-right block justify-end`}>
            <span className="mr-2 w-full font-semibold block cursor-pointer" onClick={() => { setShowTime(!showTime) }}>{content}</span>
            {showTime && <span className="text-xs text-gray-600">3 minutes ago</span>}
        </div>
    )
}