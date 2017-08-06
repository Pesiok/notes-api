// polyfills
import 'babel-polyfill';
import 'whatwg-fetch';

// node_modules dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';

// local dependencies
import reducers from './reducers';
// import sagas from './sagas'
import Main from './components/Main';
import css from '../styles/index.scss'; // eslint-disable-line

// const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(createSagaMiddleware)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          {/* <Route path="/posts/new" component={PostsNew} /> */}
          {/* <Route path="/posts/:id" component={PostsShow} /> */}
          <Route path="/" component={Main} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'),
);
