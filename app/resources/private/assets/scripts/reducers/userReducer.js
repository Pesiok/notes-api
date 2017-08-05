import { SIGN_IN, LOG_IN, LOG_OUT } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case SIGN_IN: {
            return state;
        }
        case LOG_IN: {
            return state;
        }
        case LOG_OUT: {
            return state;
        }
        default: {
            return state;
        }
    }
}