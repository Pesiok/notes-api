
// update note

export const DELETE_NOTE_FAILURE = 'delete_note_failure';
export const DELETE_NOTE_SUCCESS = 'delete_note_success';
export const DELETE_NOTE_REQUEST = 'delete_note_request';

export const deleteNoteRequest = id => (dispatch, getState) => {
  const token = getState().user.token;
  const options = {
    method: 'DELETE',
    headers: {
      'x-auth': token,
    },
  };

  dispatch({ type: DELETE_NOTE_REQUEST });

  return fetch(`/api/notes/${id}`, options)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
    })
    .then(
      () => dispatch({ type: DELETE_NOTE_SUCCESS, payload: id }),
      error => dispatch({ type: DELETE_NOTE_FAILURE, error }),
    );
};

