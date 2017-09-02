
// new note

export const NEW_NOTE_FAILURE = 'new_note_failure';
export const NEW_NOTE_SUCCESS = 'new_note_success';
export const NEW_NOTE_REQUEST = 'new_note_request';

export const newNoteRequest = note => (dispatch, getState) => {
  const token = getState().user.token;
  const options = {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'x-auth': token,
      'Content-Type': 'application/json',
    },
  };

  dispatch({ type: NEW_NOTE_REQUEST });

  return fetch('/api/notes', options)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(
      (data) => {
        dispatch({ type: NEW_NOTE_SUCCESS, payload: data });
        return data;
      },
      error => dispatch({ type: NEW_NOTE_FAILURE, error }),
    );
};

