
// update note

import store from '../../index';

export const DELETE_NOTE_FAILURE = 'delete_note_failure';
export const DELETE_NOTE_SUCCESS = 'delete_note_success';
export const DELETE_NOTE_REQUEST = 'delete_note_request';

export function deleteNoteRequest(id) {
  const token = store.getState().userReducer.token;
  const options = {
    method: 'DELETE',
    headers: {
      'x-auth': token,
    },
  };

  return (dispatch) => {
    dispatch({ type: DELETE_NOTE_REQUEST });

    fetch(`/api/notes/${id}`, options)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(
        data => dispatch({ type: DELETE_NOTE_SUCCESS, payload: data }),
        error => dispatch({ type: DELETE_NOTE_FAILURE, error }),
      );
  };
}
