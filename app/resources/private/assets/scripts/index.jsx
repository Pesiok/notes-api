// polyfills
import 'babel-polyfill';
import 'whatwg-fetch';

// node_modules dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

// local dependencies
import rootReducer from './reducers/index';
import Main from './components/Main';
import NotesIndex from './containers/NotesIndex';
import Note from './containers/Note';
import css from '../styles/index.scss'; // eslint-disable-line

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          {/* <Route path="/posts/new" component={PostsNew} /> */}
          <Route path="/notes/:id" component={Note}>
          <Route path="/" component={Main} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'),
);

export default store;

