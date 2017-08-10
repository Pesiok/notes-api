import {
  GET_NOTES_REQUEST,
  GET_NOTES_FAILURE,
  GET_NOTES_SUCCESS,
} from '../actions/notes/getNotesActions';

import {
  GET_NOTE_REQUEST,
  GET_NOTE_FAILURE,
  GET_NOTE_SUCCESS,
} from '../actions/notes/getNoteActions';

// state.notesReducer.notes // eslint-disable-next-line
//       .filter(note => note._id === ownProps.match.params.id)[0]

export default function (state = {}, action) {
  switch (action.type) {
    case GET_NOTES_REQUEST: {
      return state;
    }
    case GET_NOTES_FAILURE: {
      return state;
    }
    case GET_NOTES_SUCCESS: {
      const notes = action.payload;
      return Object.assign({}, state, notes);
    }
    case GET_NOTE_REQUEST: {
      return state;
    }
    case GET_NOTE_FAILURE: {
      return state;
    }
    case GET_NOTE_SUCCESS: {
      const notes = state.notes;
      const newNote = action.payload;
      // eslint-disable-next-line
      const index = notes.indexOf(notes.filter(note => note._id === newNote._id)[0]);
      notes[index] = newNote;
      return Object.assign({}, state, notes);
    }
    default: {
      return state;
    }
  }
}
