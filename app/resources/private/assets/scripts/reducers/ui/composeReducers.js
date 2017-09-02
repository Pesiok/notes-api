import {
  GET_NOTES_REQUEST,
  GET_NOTES_FAILURE,
  GET_NOTES_SUCCESS,
} from '../../actions/notes/getNotesActions';

import {
  GET_NOTE_REQUEST,
  GET_NOTE_FAILURE,
  GET_NOTE_SUCCESS,
} from '../../actions/notes/getNoteActions';

import {
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_FAILURE,
  UPDATE_NOTE_SUCCESS,
} from '../../actions/notes/updateNoteActions';

import {
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_FAILURE,
  DELETE_NOTE_SUCCESS,
} from '../../actions/notes/deleteNoteActions';

import {
  NEW_NOTE_REQUEST,
  NEW_NOTE_FAILURE,
  NEW_NOTE_SUCCESS,
} from '../../actions/notes/newNoteActions';

import {
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
} from '../../actions/user/logInActions';

import {
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
} from '../../actions/user/logOutActions';

import {
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
} from '../../actions/user/signInActions';

import {
  GET_SHARED_NOTE_REQUEST,
  GET_SHARED_NOTE_FAILURE,
  GET_SHARED_NOTE_SUCCESS,
} from '../../actions/shared/getSharedNoteActions';

import {
  RESET_LOG_IN_ERROR,
  RESET_LOG_OUT_ERROR,
  RESET_SIGN_IN_ERROR,
  RESET_GET_NOTES_ERROR,
  RESET_GET_NOTE_ERROR,
  RESET_NEW_NOTE_ERROR,
  RESET_UPDATE_NOTE_ERROR,
  RESET_DELETE_NOTE_ERROR,
  RESET_GET_SHARED_NOTES_ERROR,
} from '../../actions/ui/resetErrorActions';

const composeUIReducer = (actions) => {
  const defaultState = { isFetching: false, error: null };
  return (state = defaultState, action) => {
    switch (action.type) {
      case actions.request: {
        return Object.assign({}, state, { isFetching: true });
      }
      case actions.failure: {
        const error = action.error.message || 'Something went wrong';
        return Object.assign({}, state, { isFetching: false, error });
      }
      case actions.success: {
        return Object.assign({}, state, { isFetching: false, error: null });
      }
      case actions.resetError: {
        return Object.assign({}, state, { error: null });
      }
      default: {
        return state;
      }
    }
  };
};

export const getSharedNoteReducer = composeUIReducer({
  request: GET_SHARED_NOTE_REQUEST,
  failure: GET_SHARED_NOTE_FAILURE,
  success: GET_SHARED_NOTE_SUCCESS,
  resetError: RESET_GET_SHARED_NOTES_ERROR,
});

export const getNotesReducer = composeUIReducer({
  request: GET_NOTES_REQUEST,
  failure: GET_NOTES_FAILURE,
  success: GET_NOTES_SUCCESS,
  resetError: RESET_GET_NOTES_ERROR,
});

export const getNoteReducer = composeUIReducer({
  request: GET_NOTE_REQUEST,
  failure: GET_NOTE_FAILURE,
  success: GET_NOTE_SUCCESS,
  resetError: RESET_GET_NOTE_ERROR,
});

export const deleteNoteReducer = composeUIReducer({
  request: DELETE_NOTE_REQUEST,
  failure: DELETE_NOTE_FAILURE,
  success: DELETE_NOTE_SUCCESS,
  resetError: RESET_DELETE_NOTE_ERROR,
});

export const newNoteReducer = composeUIReducer({
  request: NEW_NOTE_REQUEST,
  failure: NEW_NOTE_FAILURE,
  success: NEW_NOTE_SUCCESS,
  resetError: RESET_NEW_NOTE_ERROR,
});

export const updateNoteReducer = composeUIReducer({
  request: UPDATE_NOTE_REQUEST,
  failure: UPDATE_NOTE_FAILURE,
  success: UPDATE_NOTE_SUCCESS,
  resetError: RESET_UPDATE_NOTE_ERROR,
});

export const logInReducer = composeUIReducer({
  request: LOG_IN_REQUEST,
  failure: LOG_IN_FAILURE,
  success: LOG_IN_SUCCESS,
  resetError: RESET_LOG_IN_ERROR,
});

export const logOutReducer = composeUIReducer({
  request: LOG_OUT_REQUEST,
  failure: LOG_OUT_FAILURE,
  success: LOG_OUT_SUCCESS,
  resetError: RESET_LOG_OUT_ERROR,
});

export const signInReducer = composeUIReducer({
  request: SIGN_IN_REQUEST,
  failure: SIGN_IN_FAILURE,
  success: SIGN_IN_SUCCESS,
  resetError: RESET_SIGN_IN_ERROR,
});
