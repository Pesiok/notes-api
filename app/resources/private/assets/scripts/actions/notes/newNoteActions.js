// new note

import store from '../../index';

export const NEW_NOTE_FAILURE = 'new_note_failure';
export const NEW_NOTE_SUCCESS = 'new_note_success';
export const NEW_NOTE_REQUEST = 'new_note_request';

export function newNoteRequest(note) {
  const token = store.getState().userReducer.token;
  const options = {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'x-auth': token,
      'Content-Type': 'application/json',
    },
  };

  return (dispatch) => {
    dispatch({ type: NEW_NOTE_REQUEST });

    fetch('/api/notes', options)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(
        data => dispatch({ type: NEW_NOTE_SUCCESS, payload: data }),
        error => dispatch({ type: NEW_NOTE_FAILURE, error }),
      );
  };
}
