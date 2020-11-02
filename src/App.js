import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from 'react-router-dom';
import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux';

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
import { AddTeam } from './components/add_team/AddTeam';
import { EditProject } from './components/edit_project/EditProject';
import { authCompleted } from './components/login/isLoginRouteSlice';
import { getTeams } from './services/teamServices';

const App = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const addProjectModal = useSelector(state => state.addProjectModal)
  const editTaskModal = useSelector(state => state.editTaskModal)
  const addTeamModal = useSelector(state => state.addTeamModal)
  const editProjectModal = useSelector(state => state.editProjectModal)
  const currentlyOpenedTask = useSelector(state => state.currentlyOpenedTask)
  const routes = [
    { path: '/login', Main: () => <Login /> },
    { path: '/dashboard', Main: () => <Dashboard />, title: "Dashboard" },
    { path: '/tasks', Main: () => <MyTasks />, title: "My Tasks" },
    { path: '/setupteam', Main: () => <SetupTeam /> },
    { path: `/project`, Main: () => <ProjectDetails /> },
    { path: `/team/:teamID`, Main: () => <TeamDetails /> },
  ]
  const dispatch = useDispatch()
  // if (!localStorage.getItem('email')) return <Redirect to="/login" />
  useEffect(() => {
    if (localStorage.getItem('email') || localStorage.getItem('token')) {
      dispatch(authCompleted())
    }

  }, [])

  return (
    <Router>
      <div className={isLoggedIn ? "absolute top-0 left-0" : "absolute top-0 right-0"}>
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
      {addTeamModal && (
        <Modal>
          <AddTeam />
        </Modal>
      )}
      {editProjectModal && (
        <Modal>
          <EditProject />
        </Modal>
      )}
      <div className={!isLoggedIn ? '' : 'flex'}>
        <div className={!isLoggedIn ? '' : 'max-w-xs z-30 fixed'}>
          {isLoggedIn && < SideNav routes={routes} />}
        </div>
        <div className={!isLoggedIn ? 'w-full' : 'flex-grow float-right z-0'} >
          <div className="flex" >
            <div className={isLoggedIn && "max-w-xs w-88"}></div>
            <div className="flex-grow" style={!isLoggedIn ? { backgroundColor: "#fff" } : { backgroundColor: "#EFEFEF" }}>
              <Switch>
                {
                  routes.map(({ path, Main, title }, index) => (

                    <Route
                      key={index}
                      path={path}
                      render={() => isLoggedIn ? <Main /> : <Login />}
                    />
                  ))
                }
                <Route path="*">
                  <h3>Seems like you're lost</h3>
                  <p>Error 404</p>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}


export default App;
