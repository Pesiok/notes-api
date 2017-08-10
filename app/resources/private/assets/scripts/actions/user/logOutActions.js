

// Log out

export const LOG_OUT_FAILURE = 'log_out_failure';
export const LOG_OUT_SUCCESS = 'log_out_success';
export const LOG_OUT_REQUEST = 'log_out_request';

export function logOutRequest(token, changeRoute) {
  const options = {
    method: 'DELETE',
    headers: {
      'x-auth': token,
    },
  };

  return (dispatch) => {
    dispatch({ type: LOG_OUT_REQUEST });

    fetch('/api/users/logout', options)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response;
      })
      .then(
        () => {
          dispatch({ type: LOG_OUT_SUCCESS });
          changeRoute();
        },
        error => dispatch({ type: LOG_OUT_FAILURE, error }),
      );
  };
}

