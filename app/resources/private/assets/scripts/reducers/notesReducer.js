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

const arrToObj = (arr, key) => Object.assign({}, ...arr.map(item => ({ [item[key]]: item })));

export default function (state = {}, action) {
  switch (action.type) {
    case GET_NOTES_SUCCESS: {
      const notes = arrToObj(action.payload.notes, '_id');
      return Object.assign({}, state, notes);
    }
    case UPDATE_NOTE_SUCCESS:
    case GET_NOTE_SUCCESS: {
      const id = action.payload.note._id;
      const notes = Object.assign({}, state, { [id]: action.payload.note });
      return notes;
    }
    // case GET_NOTES_REQUEST: {
    //   return state;
    // }
    // case GET_NOTES_FAILURE: {
    //   return state;
    // }
    // case UPDATE_NOTE_REQUEST: {
    //   return state;
    // }
    // case UPDATE_NOTE_FAILURE: {
    //   return state;
    // }
    // case GET_NOTE_REQUEST: {
    //   return state;
    // }
    // case GET_NOTE_FAILURE: {
    //   return state;
    // }
    default: {
      return state;
    }
  }
}
