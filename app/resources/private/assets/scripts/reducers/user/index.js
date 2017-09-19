import {
  SIGN_UP_SUCCESS,
} from '../../actions/user/signUpActions';

import {
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
} from '../../actions/user/logInActions';

import {
  LOG_OUT_SUCCESS,
} from '../../actions/user/logOutActions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
    case LOG_IN_SUCCESS: {
      const { user, token } = action.payload;
      const { isAuthenticated } = action;
      return Object.assign({}, state, { user, token, isAuthenticated });
    }
    case LOG_OUT_SUCCESS: {
      const { isAuthenticated } = action;
      return Object.assign({}, state, { token: null, isAuthenticated });
    }
    case LOG_IN_FAILURE: {
      const { isAuthenticated, error } = action;
      return Object.assign({}, state, { token: null, isAuthenticated, error });
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
