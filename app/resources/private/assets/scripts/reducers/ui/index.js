import { combineReducers } from 'redux';

import {
  getNotesReducer,
  getNoteReducer,
  deleteNoteReducer,
  newNoteReducer,
  updateNoteReducer,
  logInReducer,
  logOutReducer,
  signUpReducer,
  getSharedNoteReducer,
} from './composeReducers';
import menuReducer from './menuReducer';

const uiReducer = combineReducers({
  getNotes: getNotesReducer,
  getNote: getNoteReducer,
  getSharedNote: getSharedNoteReducer,
  updateNote: updateNoteReducer,
  newNote: newNoteReducer,
  deleteNote: deleteNoteReducer,
  logIn: logInReducer,
  logOut: logOutReducer,
  signUp: signUpReducer,
  menu: menuReducer,
});

export default uiReducer;
