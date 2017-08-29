import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// components
import PrivateRoute from './../containers/PrivateRoute';
import Home from './Home';
import Header from './Header';
import NotesFilter from './../containers/NotesFilter';
import NotesIndex from './../containers/NotesIndex';
import Note from './../containers/Note';
import NewNote from './../components/NewNote';
import Settings from './../containers/Settings';
import SignInPage from './SignInPage';
import LogInPage from './LogInPage';

const Main = () => (
  <Switch>
    <PrivateRoute path="/settings" shouldRender={Settings} />
    <PrivateRoute path="/filter" shouldRender={NotesFilter} />
    <PrivateRoute path="/notes/new" shouldRender={NewNote} />
    <PrivateRoute path="/notes/:id" shouldRender={Note} />
    <PrivateRoute path="/notes" shouldRender={NotesIndex} />
    <Route path="/signin" component={SignInPage} />
    <Route path="/login" component={LogInPage} />
    <Route path="/about" component={Home} />
    <Route path="/" exact component={Home} />
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
