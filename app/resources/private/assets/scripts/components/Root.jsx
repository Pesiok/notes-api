import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Main from './Main';
import NotesIndex from './../containers/NotesIndex';
import Note from './../containers/Note';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/notes/new" component={Note} />
        <Route path="/notes/:id" component={Note} />
        <Route path="/notes" component={NotesIndex} />
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object // eslint-disable-line
};

export default Root;
