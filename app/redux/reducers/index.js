import authReducer from './auth';
import trainingReducer from './trainingType';
import { combineReducers } from 'redux';

export default combineReducers({
  authReducer,
  trainingReducer
});
