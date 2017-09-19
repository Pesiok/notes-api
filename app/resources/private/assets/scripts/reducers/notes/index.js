import { GET_NOTES_SUCCESS } from '../../actions/notes/getNotesActions';
import { GET_NOTE_SUCCESS } from '../../actions/notes/getNoteActions';
import { UPDATE_NOTE_SUCCESS } from '../../actions/notes/updateNoteActions';
import { DELETE_NOTE_SUCCESS } from '../../actions/notes/deleteNoteActions';
import { NEW_NOTE_SUCCESS } from '../../actions/notes/newNoteActions';
import { LOG_OUT_SUCCESS } from '../../actions/user/logOutActions';
import { LOG_IN_SUCCESS } from '../../actions/user/logInActions';
import { SIGN_UP_SUCCESS } from '../../actions/user/signUpActions';

const arrToObj = (arr, key) => Object.assign({}, ...arr.map(item => ({ [item[key]]: item })));

const notesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NOTES_SUCCESS: {
      const notes = arrToObj(action.payload.notes, '_id');
      return Object.assign({}, state, notes);
    }
    case NEW_NOTE_SUCCESS:
    case UPDATE_NOTE_SUCCESS:
    case GET_NOTE_SUCCESS: {
      const id = action.payload.note._id;
      return Object.assign({}, state, { [id]: action.payload.note });
    }
    case DELETE_NOTE_SUCCESS: {
      const id = action.payload;
      const notes = Object.assign({}, state);
      delete notes[id];
      return notes;
    }
    case LOG_OUT_SUCCESS:
    case LOG_IN_SUCCESS:
    case SIGN_UP_SUCCESS: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default notesReducer;
