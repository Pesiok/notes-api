import { combineReducers } from 'redux';
import userReducer from './userReducer';
import notesReducer from './notesReducer';

const rootReducer = combineReducers({
  userReducer,
  notesReducer,
});

export default rootReducer;
