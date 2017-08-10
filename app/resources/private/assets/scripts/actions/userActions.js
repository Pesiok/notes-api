
// Sign in

export const SIGN_IN_FAILURE = 'sign_in_failure';
function signInFailure(error) {
  return {
    type: SIGN_IN_FAILURE,
    error,
  };
}

export const SIGN_IN_SUCCESS = 'sign_in_success';
function signInSuccess(data) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: data,
  };
}

export const SIGN_IN_REQUEST = 'sign_in_request';
export function signInRequest(credentials, changeRoute) {
  const options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return (dispatch) => {
    dispatch({ type: SIGN_IN_REQUEST });

    fetch('/api/users/signin', options)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);

        return response.json().then(user => (
          { user, token: response.headers.get('x-auth') }
        ));
      })
      .then(
        (data) => {
          dispatch(signInSuccess(data));
          changeRoute();
        },
        error => dispatch(signInFailure(error)),
      );
  };
}

// Log in 

export const LOG_IN_FAILURE = 'log_in_failure';
export function logInFailure(error) {
  return {
    type: LOG_IN_FAILURE,
    error,
  };
}

export const LOG_IN_SUCCESS = 'log_in_success';
function logInSuccess(data) {
  return {
    type: LOG_IN_SUCCESS,
    payload: data,
  };
}

export const LOG_IN_REQUEST = 'log_in_request';
export function logInRequest(credentials, changeRoute) {
  const options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return (dispatch) => {
    dispatch({ type: LOG_IN_REQUEST });

    fetch('/api/users/login', options)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);

        return response.json().then(user => (
          { user, token: response.headers.get('x-auth') }
        ));
      })
      .then(
        (data) => {
          dispatch(logInSuccess(data));
          changeRoute();
        },
        error => dispatch(logInFailure(error)),
      );
  };
}

// Log out

export const LOG_OUT_FAILURE = 'log_out_failure';
export function logOutFailure(error) {
  return {
    type: LOG_OUT_FAILURE,
    error,
  };
}

export const LOG_OUT_SUCCESS = 'log_out_success';
function logOutSuccess(data, changeRoute) {
  if (changeRoute) changeRoute();

  return {
    type: LOG_OUT_SUCCESS,
  };
}

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
        () => dispatch(logOutSuccess(changeRoute)),
        error => dispatch(logOutFailure(error)),
      );
  };
}

