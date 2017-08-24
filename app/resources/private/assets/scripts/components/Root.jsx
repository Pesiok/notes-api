import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// components
import Home from './Home';
import Header from './Header';
import NotesFilter from './../containers/NotesFilter';
import NotesIndex from './../containers/NotesIndex';
import Note from './../containers/Note';
import NewNote from './../components/NewNote';
import Settings from './../containers/Settings';


const Main = () => (
  <Switch>
    <Route path="/settings" component={Settings} />
    <Route path="/filter" component={NotesFilter} />
    <Route path="/notes/new" component={NewNote} />
    <Route path="/notes/:id" component={Note} />
    <Route path="/notes" component={NotesIndex} />
    <Route path="/" component={Home} />
  </Switch>
);

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
);

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object // eslint-disable-line
};

export default Root;
