// polyfills
import 'babel-polyfill';
import 'whatwg-fetch';

// node_modules dependencies
import React from 'react';
import { render } from 'react-dom';

// local dependencies
import Root from './components/Root';
import configureStore from './config/configureStore';
import css from '../styles/index.scss'; // eslint-disable-line

const store = configureStore();
export default store;

render(
  <Root store={store} />
  , document.getElementById('root'),
);
