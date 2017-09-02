import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// components
import PrivateRoute from './../containers/Access/PrivateRoute';
import Home from './Public/Home';
import Header from './Header/Header';
import NotesFilter from './../containers/Notes/NotesFilter';
import NotesIndex from './../containers/Notes/NotesIndex';
import Note from './../containers/Notes/Note';
import NewNote from './../components/Notes/NewNote';
import Settings from './../containers/Settings/Settings';
import SignInPage from './../containers/Access/SignInPage';
import LogInPage from './../containers/Access/LogInPage';
import SharedNote from './../containers/Shared/SharedNote';

const Main = () => (
  <Switch>
    <PrivateRoute path="/settings" shouldRender={Settings} />
    <PrivateRoute path="/filter" shouldRender={NotesFilter} />
    <PrivateRoute path="/notes/new" shouldRender={NewNote} />
    <PrivateRoute path="/notes/:id" shouldRender={Note} />
    <PrivateRoute path="/notes" shouldRender={NotesIndex} />
    <Route path="/share/:id" component={SharedNote} />
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
