import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';

import { SideNav } from './components/side_nav/SideNav'
import { Login } from './components/login/Login'
import { Dashboard } from './components/dashboard/Dashboard'
import { MyTasks } from './components/my_tasks/MyTasks'
import { SetupTeam } from './components/setup_team/SetupTeam'
import { Alert } from './components/alert/Alert';

import ProfileImage from './assets/img/profileImage.svg'
import { ProjectDetails } from './components/project_details/ProjectDetails';
import { TeamDetails } from './components/team_details/TeamDetails';
import { Modal } from './components/modal/Modal'
import { AddProject } from './components/add_project/AddProject';
import { EditTask } from './components/edit_task/EditTask';
import { getAllProjects } from './services/projectServices';

const App = () => {
  const isLoginRoute = useSelector(state => state.isLoginRoute)
  const addProjectModal = useSelector(state => state.addProjectModal)
  const editTaskModal = useSelector(state => state.editTaskModal)
  const currentlyOpenedTask = useSelector(state => state.currentlyOpenedTask)
  const routes = [
    { path: '/', Main: () => <Login /> },
    { path: '/login', Main: () => <Login /> },
    { path: '/dashboard', Main: () => <Dashboard />, title: "Dashboard" },
    { path: '/tasks', Main: () => <MyTasks />, title: "My Tasks" },
    { path: '/setup-team', Main: () => <SetupTeam /> },
    { path: `/project/:projectID`, Main: () => <ProjectDetails /> },
    { path: `/team/:teamID`, Main: () => <TeamDetails /> },
  ]

  return (
    <Router>
      <div className={isLoginRoute ? "absolute top-0 left-0" : "absolute top-0 right-0"}>
        <Alert className="z-40" />
      </div>
      {addProjectModal && (
        <Modal>
          <AddProject />
        </Modal>
      )}
      {editTaskModal && (
        <Modal>
          <EditTask task={currentlyOpenedTask} />
        </Modal>
      )}
      <div className={isLoginRoute ? '' : 'flex'}>
        <div className={isLoginRoute ? '' : 'max-w-xs z-30 fixed'}>
          {!isLoginRoute && < SideNav routes={routes} />}
        </div>
        <div className={isLoginRoute ? 'w-full' : 'flex-grow float-right z-0'} >
          <div className="flex" >
            <div className={!isLoginRoute && "max-w-xs w-88"}></div>
            <div className="flex-grow" style={isLoginRoute ? { backgroundColor: "#fff" } : { backgroundColor: "#EFEFEF" }}>
              <Switch>
                {
                  routes.map(({ path, Main, title }, index) => (

                    <Route
                      key={index}
                      path={path}
                      exact
                      children={<Main />}
                    />
                  ))
                }
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
