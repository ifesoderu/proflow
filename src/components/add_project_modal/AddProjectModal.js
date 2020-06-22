import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


const addProjectModalRoot = document.getElementById('add-project-modal-root');

export const AddProjectModal = ({ children }) => {
    const el = document.createElement('div');


    useEffect(() => {
        addProjectModalRoot.appendChild(el)
        return () => {
            addProjectModalRoot.removeChild(el)
        }
    }, [])

    return ReactDOM.createPortal(children, el)
};
