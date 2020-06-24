import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loginReducer from '../components/login/loginSlice';
import isLoginReducer from '../components/login/isLoginRouteSlice';
import alertReducer from '../components/alert/alertSlice';
import teamsReducer from '../components/setup_team/teamsSlice';
import { composeWithDevTools } from 'redux-devtools-extension'
import myTaskListReducer from '../components/task_list/myTaskListSlice';
import favouriteProjectListReducer from '../components/project_list/favouriteProjectListSlice';
import addProjectModalReducer from '../components/project_list/addProjectModalSlice';
import openedProjectReducer from '../components/project_details/openedProjectSlice';
import loadedSectionsReducer from '../components/project_board/loadedSectionsSlice';
import loadedTasksReducer from '../components/project_board/loadedTasksSlice';
import projectCommentReducer from '../components/project_comments/projectCommentsSlice';
import nestedSectionsReducer from '../components/project_board/nestedSectionsSlice';
import joinedTeamsReducer from '../components/side_nav/joinedTeamsSlice';
import editTaskModalReducer from '../components/project_board/editTaskModalSlice';
import currentlyOpenedTaskReducer from '../components/project_board/currentlyOpenedTaskSlice';
import teamIDofOpenedProjectReducer from '../components/project_details/teamIDofOpenedProjectSlice';


export default configureStore({
  reducer: {
    isLoginRoute: isLoginReducer,
    authentication: loginReducer || { email: localStorage.getItem('email') },
    alert: alertReducer,
    teams: teamsReducer,
    teamIDofOpenedProject: teamIDofOpenedProjectReducer,
    joinedTeams: joinedTeamsReducer,
    myTasks: myTaskListReducer,
    currentlyOpenedTask: currentlyOpenedTaskReducer,
    favouriteProjects: favouriteProjectListReducer,
    addProjectModal: addProjectModalReducer,
    editTaskModal: editTaskModalReducer,
    openedProject: openedProjectReducer,
    loadedSections: loadedSectionsReducer,
    loadedTasks: loadedTasksReducer,
    projectComments: projectCommentReducer,
    nestedSections: nestedSectionsReducer,
  },
  // middleware: [composeWithDevTools, ...getDefaultMiddleware()]
});
