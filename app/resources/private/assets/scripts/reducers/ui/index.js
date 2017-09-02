import { combineReducers } from 'redux';
import {
  getNotesReducer,
  getNoteReducer,
  deleteNoteReducer,
  newNoteReducer,
  updateNoteReducer,
  logInReducer,
  logOutReducer,
  signInReducer,
  getSharedNoteReducer,
} from './composeReducers';

const uiReducer = combineReducers({
  getNotes: getNotesReducer,
  getNote: getNoteReducer,
  getSharedNote: getSharedNoteReducer,
  updateNote: updateNoteReducer,
  newNote: newNoteReducer,
  deleteNote: deleteNoteReducer,
  logIn: logInReducer,
  logOut: logOutReducer,
  signIn: signInReducer,
});

export default uiReducer;
