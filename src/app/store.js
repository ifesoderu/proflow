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
import joinedTeamProjectsReducer from '../components/side_nav/joinedTeamProjectsSlice';
import addTeamModalReducer from '../components/side_nav/addTeamModalSlice';
import editProjectModalReducer from '../components/project_details/editProjectModalSlice';
import membersReducer from '../components/project_board/membersSlice';
import isFirstTeamReducer from '../components/setup_team/isFirstTeamSlice';


export default configureStore({
  reducer: {
    isLoggedIn: isLoginReducer,
    authentication: loginReducer || { email: localStorage.getItem('email') },
    alert: alertReducer,
    teams: teamsReducer,
    isFirstTeam: isFirstTeamReducer,
    members: membersReducer,
    teamIDofOpenedProject: teamIDofOpenedProjectReducer,
    joinedTeams: joinedTeamsReducer,
    joinedTeamsProjects: joinedTeamProjectsReducer,
    myTasks: myTaskListReducer,
    currentlyOpenedTask: currentlyOpenedTaskReducer,
    favouriteProjects: favouriteProjectListReducer,
    addProjectModal: addProjectModalReducer,
    editTaskModal: editTaskModalReducer,
    editProjectModal: editProjectModalReducer,
    addTeamModal: addTeamModalReducer,
    openedProject: openedProjectReducer,
    loadedSections: loadedSectionsReducer,
    loadedTasks: loadedTasksReducer,
    projectComments: projectCommentReducer,
    nestedSections: nestedSectionsReducer,
  },
  // middleware: [composeWithDevTools, ...getDefaultMiddleware()]
});
