import {
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
} from '../actions/user/signInActions';

import {
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
} from '../actions/user/logInActions';

import {
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
} from '../actions/user/logOutActions';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
    case LOG_IN_SUCCESS: {
      const { user, token } = action.payload;
      const { isAuthenticated } = action;
      return Object.assign({}, state, { user, token, isAuthenticated });
    }
    case LOG_OUT_SUCCESS: {
      const { isAuthenticated } = action;
      return Object.assign({}, state, { token: null, isAuthenticated });
    }
    case SIGN_IN_REQUEST: {
      return state;
    }
    case SIGN_IN_FAILURE: {
      return state;
    }
    case LOG_IN_REQUEST: {
      return state;
    }
    case LOG_IN_FAILURE: {
      const { isAuthenticated, error } = action;
      return Object.assign({}, state, { token: null, isAuthenticated, error });
    }
    case LOG_OUT_REQUEST: {
      return state;
    }
    case LOG_OUT_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
}
