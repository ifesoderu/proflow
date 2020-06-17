import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { SideNav } from './components/side_nav/SideNav'
import { Login } from './components/login/Login'
import { Dashboard } from './components/dashboard/Dashboard'
import { MyTasks } from './components/my_tasks/MyTasks'
import { SetupTeam } from './components/setup_team/SetupTeam'
import { Alert } from './components/alert/Alert';



const App = () => {
  const routes = [
    { path: '/login', Main: () => <Login /> },
    { path: '/dashboard', Main: () => <Dashboard /> },
    { path: '/tasks', Main: () => <MyTasks /> },
    { path: '/setup-team', Main: () => <SetupTeam /> },
  ]
  const isLoginRoute = window.location.pathname === '/login'
  return (
    <Router>
      <div className={isLoginRoute ? "absolute top-0 left-0" : "absolute top-0 right-0"}>
        <Alert className="z-50" />
      </div>
      <div className={isLoginRoute ? '' : 'flex'}>
        <div className={isLoginRoute ? '' : 'w-1/4 z-40'}>
          {!isLoginRoute && < SideNav routes={routes} />}
        </div>
        <div className={isLoginRoute ? 'w-full' : 'flex-grow z-0'} >
          <Switch>
            {
              routes.map(({ path, Main }, index) => (
                <Route
                  key={index}
                  path={path}
                  children={<Main />}
                />
              ))
            }
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;
