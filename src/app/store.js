import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loginReducer from '../components/login/loginSlice';
import isLoginReducer from '../components/login/isLoginRouteSlice';
import alertReducer from '../components/alert/alertSlice';
import teamsReducer from '../components/setup_team/teamsSlice';
import { composeWithDevTools } from 'redux-devtools-extension'
import myTaskListReducer from '../components/TaskList/myTaskListSlice';
import favouriteProjectListReducer from '../components/project_list/favouriteProjectListSlice';
import addProjectModalReducer from '../components/project_list/addProjectModal';
import openedProjectReducer from '../components/project_details/openedProjectSlice';

export default configureStore({
  reducer: {
    isLoginRoute: isLoginReducer,
    authentication: loginReducer || { email: localStorage.getItem('email') },
    alert: alertReducer,
    teams: teamsReducer,
    myTasks: myTaskListReducer,
    favouriteProjects: favouriteProjectListReducer,
    addProjectModal: addProjectModalReducer,
    openedProject: openedProjectReducer
  },
  // middleware: [composeWithDevTools, ...getDefaultMiddleware()]
});
