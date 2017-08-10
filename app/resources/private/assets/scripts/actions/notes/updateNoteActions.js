
// update note

import store from '../../index';

export const UPDATE_NOTE_FAILURE = 'update_note_failure';
export const UPDATE_NOTE_SUCCESS = 'update_note_success';
export const UPDATE_NOTE_REQUEST = 'update_note_request';

export function updateNoteRequest(id, update) {
  const token = store.getState().userReducer.token;
  const options = {
    method: 'PATH',
    body: update,
    headers: {
      'x-auth': token,
    },
  };

  return (dispatch) => {
    dispatch({ type: UPDATE_NOTE_REQUEST });

    fetch(`/api/notes/${id}`, options)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(
        data => dispatch({ type: UPDATE_NOTE_SUCCESS, payload: data }),
        error => dispatch({ type: UPDATE_NOTE_FAILURE, error }),
      );
  };
}
