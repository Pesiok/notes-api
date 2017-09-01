import { combineReducers } from 'redux';

// reducers
import userReducer from './user';
import notesReducer from './notes';
import uiReducer from './ui';
import sharedReducer from './shared';

// root
const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
  ui: uiReducer,
  shared: sharedReducer,
});

export default rootReducer;
