// polyfills
import 'babel-polyfill';
import 'whatwg-fetch';
import 'classlist.js';

// node_modules dependencies
import React from 'react';
import { render } from 'react-dom';

// local dependencies
import Root from './components/Root';
import configureStore from './config/configureStore';
import css from '../styles/index.scss'; // eslint-disable-line

const store = configureStore();
const root = document.getElementById('root');

render(<Root store={store} />, root);

export default store;
