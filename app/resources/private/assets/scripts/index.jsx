// polyfills
import 'babel-polyfill';
import 'whatwg-fetch';

// node_modules dependencies
import React from 'react';
import { render } from 'react-dom';

// service worker & app cache
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

// local dependencies
import Root from './components/Root';
import configureStore from './config/configureStore';

// non-js files for webpack
import css from '../styles/index.scss'; // eslint-disable-line
import '../meta/meta';

OfflinePluginRuntime.install();
const store = configureStore();
const root = document.getElementById('root');

render(<Root store={store} />, root);

export default store;
