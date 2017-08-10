import store from '../index';

// get notes

export const GET_NOTES_FAILURE = 'get_notes_failure';
function getNotesFailure(error) {
  return {
    type: GET_NOTES_FAILURE,
    error,
  };
}

export const GET_NOTES_SUCCESS = 'get_notes_success';
function getNotesSuccess(data, changeRoute) {
  if (changeRoute) changeRoute();
  return {
    type: GET_NOTES_SUCCESS,
    payload: data,
  };
}

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
        data => dispatch(getNotesSuccess(data)),
        error => dispatch(getNotesFailure(error)),
      );
  };
}
