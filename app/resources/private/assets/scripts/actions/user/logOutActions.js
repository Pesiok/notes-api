

// Log out

export const LOG_OUT_FAILURE = 'log_out_failure';
export const LOG_OUT_SUCCESS = 'log_out_success';
export const LOG_OUT_REQUEST = 'log_out_request';

export const logOutRequest = token => (dispatch) => {
  const options = {
    method: 'DELETE',
    headers: {
      'x-auth': token,
    },
  };
  dispatch({ type: LOG_OUT_REQUEST });

  return fetch('/api/users/logout', options)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response;
    })
    .then(
      () => dispatch({ type: LOG_OUT_SUCCESS }),
      error => dispatch({ type: LOG_OUT_FAILURE, error }),
    );
};
