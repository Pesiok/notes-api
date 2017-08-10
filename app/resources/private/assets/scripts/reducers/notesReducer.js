import {
  GET_NOTES_REQUEST,
  GET_NOTES_FAILURE,
  GET_NOTES_SUCCESS,
} from '../actions/notesActions';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_NOTES_REQUEST: {
      return state;
    }
    case GET_NOTES_FAILURE: {
      return state;
    }
    case GET_NOTES_SUCCESS: {
      // const { user, token } = action.payload;
      // return Object.assign({}, state, { user, token });
      console.log('get notes success: ', action.payload);
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
}
