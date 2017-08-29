
// Log in 

export const LOG_IN_FAILURE = 'log_in_failure';
export const LOG_IN_SUCCESS = 'log_in_success';
export const LOG_IN_REQUEST = 'log_in_request';

export const logInRequest = credentials => (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  dispatch({ type: LOG_IN_REQUEST });

  return fetch('/api/users/login', options)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);

      return response.json().then(user => (
        { user, token: response.headers.get('x-auth') }
      ));
    })
    .then(
      data => dispatch({ type: LOG_IN_SUCCESS, payload: data, isAuthenticated: true }),
      error => dispatch({ type: LOG_IN_FAILURE, error, isAuthenticated: false }),
    );
};
