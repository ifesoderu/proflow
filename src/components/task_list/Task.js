import React, { useState } from 'react'

export const Task = ({ task, handleTaskUpdate }) => {
    const { title, id, completed } = task
    return (
        <li className="mb-4 py-6 pb-3 pl-6 text-base align-middle font-bold rounded-md" style={{ boxShadow: '0px 4px 15px #e3e3e3' }}>
            {!completed ? (<button className="border-0 mr-12 py-0 bg-opacity-0 outline-none" onClick={() => { handleTaskUpdate({ id, value: true }) }}>
                <span className={`inline-block h-6 w-6 rounded-full border border-gray-400`}></span>
            </button>)
                : (<button className="py-0 bg-opacity-0 border-0 mr-12 outline-none" onClick={() => { handleTaskUpdate({ id, value: false }) }}>
                    <span className={`inline-block h-6 w-6 rounded-full border border-gray-400 bg-green-500`}></span>
                </button>)
            }
            <div className={`align-middle inline-block mb-3 ${completed && 'line-through'}`}>{title}</div>
        </li>
    )
}