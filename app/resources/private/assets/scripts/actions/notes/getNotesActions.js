
// get notes

import store from '../../index';

export const GET_NOTES_FAILURE = 'get_notes_failure';
export const GET_NOTES_SUCCESS = 'get_notes_success';
export const GET_NOTES_REQUEST = 'get_notes_request';

export function getNotesRequest() {
  const token = store.getState().userReducer.token;
  const options = {
    method: 'GET',
    headers: {
      'x-auth': token,
    },
  };

  return (dispatch) => {
    dispatch({ type: GET_NOTES_REQUEST });

    fetch('/api/notes', options)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(
        data => dispatch({ type: GET_NOTES_SUCCESS, payload: data }),
        error => dispatch({ type: GET_NOTES_FAILURE, error }),
      );
  };
}
