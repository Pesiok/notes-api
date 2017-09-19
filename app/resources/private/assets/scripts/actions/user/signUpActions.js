
// Sign in

export const SIGN_UP_FAILURE = 'sign_up_failure';
export const SIGN_UP_SUCCESS = 'sign_up_success';
export const SIGN_UP_REQUEST = 'sign_up_request';

export const signUpRequest = credentials => (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  dispatch({ type: SIGN_UP_REQUEST });

  return fetch('/api/users/signin', options)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);

      return response.json().then(user => (
        { user, token: response.headers.get('x-auth') }
      ));
    })
    .then(
      data => dispatch({ type: SIGN_UP_SUCCESS, payload: data, isAuthenticated: true }),
      error => dispatch({ type: SIGN_UP_FAILURE, error }),
    );
};
