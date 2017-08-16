import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import logger from 'redux-logger';

import rootReducer from '../reducers/index';
import { loadState, saveState } from './localStorage';


const configureStore = () => {
  const persistedState = loadState();
  const middlewares = [reduxThunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(...middlewares),
  );

  // save current state to the local storage on change every 1s max
  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};

export default configureStore;
