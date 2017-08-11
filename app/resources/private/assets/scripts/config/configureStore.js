import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import rootReducer from '../reducers/index';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk),
  );

  // save current state to the local storage on change every 1 s max
  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};

export default configureStore;
