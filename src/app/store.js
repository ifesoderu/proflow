import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loginReducer from '../components/login/loginSlice';
import alertReducer from '../components/alert/alertSlice';
import teamsReducer from '../components/setup_team/teamsSlice';
import { composeWithDevTools } from 'redux-devtools-extension'

export default configureStore({
  reducer: {
    authentication: loginReducer,
    alert: alertReducer,
    teams: teamsReducer
  },
  // middleware: [composeWithDevTools, ...getDefaultMiddleware()]
});
