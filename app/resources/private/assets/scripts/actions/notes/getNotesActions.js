
// get notes

export const GET_NOTES_FAILURE = 'get_notes_failure';
export const GET_NOTES_SUCCESS = 'get_notes_success';
export const GET_NOTES_REQUEST = 'get_notes_request';

export const getNotesRequest = () => (dispatch, getState) => {
  const token = getState().user.token;
  const options = {
    method: 'GET',
    headers: {
      'x-auth': token,
    },
  };

  dispatch({ type: GET_NOTES_REQUEST });

  return fetch('/api/notes', options)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(
      data => dispatch({ type: GET_NOTES_SUCCESS, payload: data }),
      error => dispatch({ type: GET_NOTES_FAILURE, error }),
    );
};

