
// get note

export const GET_NOTE_FAILURE = 'get_note_failure';
export const GET_NOTE_SUCCESS = 'get_note_success';
export const GET_NOTE_REQUEST = 'get_note_request';

export const getNoteRequest = id => (dispatch, getState) => {
  const token = getState().user.token;
  const options = {
    method: 'GET',
    headers: {
      'x-auth': token,
    },
  };

  dispatch({ type: GET_NOTE_REQUEST });

  return fetch(`/api/notes/${id}`, options)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(
      data => dispatch({ type: GET_NOTE_SUCCESS, payload: data }),
      error => dispatch({ type: GET_NOTE_FAILURE, error }),
    );
};

