
// update note

export const UPDATE_NOTE_FAILURE = 'update_note_failure';
export const UPDATE_NOTE_SUCCESS = 'update_note_success';
export const UPDATE_NOTE_REQUEST = 'update_note_request';

export const updateNoteRequest = (id, update) => (dispatch, getState) => {
  const token = getState().user.token;
  const options = {
    method: 'PATCH',
    body: JSON.stringify(update),
    headers: {
      'x-auth': token,
      'Content-Type': 'application/json',
    },
  };

  dispatch({ type: UPDATE_NOTE_REQUEST });

  return fetch(`/api/notes/${id}`, options)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(
      data => dispatch({ type: UPDATE_NOTE_SUCCESS, payload: data }),
      error => dispatch({ type: UPDATE_NOTE_FAILURE, error }),
    );
};

