import {
  // GET_SHARED_NOTE_FAILURE,
  GET_SHARED_NOTE_SUCCESS,
  // GET_SHARED_NOTE_REQUEST,
} from '../../actions/shared/getSharedNoteActions';


const sharedReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SHARED_NOTE_SUCCESS: {
      const id = action.payload.note._id;
      return Object.assign({}, state, { [id]: action.payload.note });
    }
    default: {
      return state;
    }
  }
};

export default sharedReducer;
