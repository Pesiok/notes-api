import { combineReducers } from 'redux';
import userReducer from './user';
import notesReducer from './notes';
import uiReducer from './ui';

const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
  ui: uiReducer,
});

export default rootReducer;
