import {
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
} from '../actions/userActions';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST: {
      return state;
    }
    case SIGN_IN_FAILURE: {
      return state;
    }
    case SIGN_IN_SUCCESS: {
      const { user, token } = action.payload;
      return Object.assign({}, state, { user, token });
    }
    case LOG_IN_REQUEST: {
      return state;
    }
    case LOG_IN_FAILURE: {
      return state;
    }
    case LOG_IN_SUCCESS: {
      const { user, token } = action.payload;
      return Object.assign({}, state, { user, token });
    }
    case LOG_OUT_REQUEST: {
      return state;
    }
    case LOG_OUT_FAILURE: {
      return state;
    }
    case LOG_OUT_SUCCESS: {
      return state;
    }
    default: {
      return state;
    }
  }
}
