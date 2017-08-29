import {
  // GET_NOTES_REQUEST,
  // GET_NOTES_FAILURE,
  GET_NOTES_SUCCESS,
} from '../actions/notes/getNotesActions';

import {
  // GET_NOTE_REQUEST,
  // GET_NOTE_FAILURE,
  GET_NOTE_SUCCESS,
} from '../actions/notes/getNoteActions';

import {
  // UPDATE_NOTE_REQUEST,
  // UPDATE_NOTE_FAILURE,
  UPDATE_NOTE_SUCCESS,
} from '../actions/notes/updateNoteActions';

import {
  // DELETE_NOTE_REQUEST,
  // DELETE_NOTE_FAILURE,
  DELETE_NOTE_SUCCESS,
} from '../actions/notes/deleteNoteActions';

import {
  // NEW_NOTE_REQUEST,
  // NEW_NOTE_FAILURE,
  NEW_NOTE_SUCCESS,
} from '../actions/notes/newNoteActions';

import {
  LOG_OUT_SUCCESS,
} from '../actions/user/logOutActions';

const arrToObj = (arr, key) => Object.assign({}, ...arr.map(item => ({ [item[key]]: item })));

// success reducer

export default function (state = {}, action) {
  switch (action.type) {
    case GET_NOTES_SUCCESS: {
      const notes = arrToObj(action.payload.notes, '_id');
      return Object.assign({}, state, notes);
    }
    case NEW_NOTE_SUCCESS:
    case UPDATE_NOTE_SUCCESS:
    case GET_NOTE_SUCCESS: {
      const id = action.payload.note._id;
      const notes = Object.assign({}, state, { [id]: action.payload.note });
      return notes;
    }
    case DELETE_NOTE_SUCCESS: {
      const id = action.payload;
      const notes = Object.assign({}, state);
      delete notes[id];
      return notes;
    }
    case LOG_OUT_SUCCESS: {
      return {};
    }
    default: {
      return state;
    }
  }
}

// request reducer
// todo

// failure reducer
// todo
