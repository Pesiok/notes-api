
// get shared note

export const GET_SHARED_NOTE_FAILURE = 'get_shared_note_failure';
export const GET_SHARED_NOTE_SUCCESS = 'get_shared_note_success';
export const GET_SHARED_NOTE_REQUEST = 'get_shared_note_request';

export const getSharedNoteRequest = id => (dispatch) => {
  dispatch({ type: GET_SHARED_NOTE_REQUEST });

  return fetch(`/api/share/${id}`)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(
      data => dispatch({ type: GET_SHARED_NOTE_SUCCESS, payload: data }),
      error => dispatch({ type: GET_SHARED_NOTE_FAILURE, error }),
    );
};
