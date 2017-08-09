import {
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCES,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
} from '../actions/userActions';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST: {
      console.log('request');
      return state;
    }
    case SIGN_IN_FAILURE: {
      console.log('failure');
      return state;
    }
    case SIGN_IN_SUCCESS: {
      const { user, token } = action.payload;
      const newState = Object.assign({}, state, { user, token });
      console.log(newState);
      return newState;
    }
    case LOG_IN_REQUEST: {
      return state;
    }
    case LOG_IN_FAILURE: {
      return state;
    }
    case LOG_IN_SUCCES: {
      return state;
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
