import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// components
import PrivateRoute from './../containers/Access/PrivateRoute';
import Home from './Public/Home';
import About from './Public/About';
import Layout from './Public/Layout';
import NotesFilter from './../containers/Notes/NotesFilter';
import NotesIndex from './../containers/Notes/NotesIndex';
import Note from './../containers/Notes/Note';
import NewNote from './../components/Notes/NewNote';
import Settings from './../containers/Settings/Settings';
import SignInPage from './../containers/Access/SignInPage';
import LogInPage from './../containers/Access/LogInPage';
import SharedNote from './../containers/Shared/SharedNote';
import NotFound from './../components/Access/NotFound';

// utilis
import Fade from './Utilis/Fade';

const App = ({ location }) => {
  const currentKey = location.pathname.split('/')[1] || '/';
  return (
    <Layout>
      <TransitionGroup component="main" className="main">
        <Fade key={currentKey}>
          <div className="main__content">
            <Switch>
              <PrivateRoute path="/settings" shouldRender={Settings} />
              <PrivateRoute path="/filter" shouldRender={NotesFilter} />
              <PrivateRoute path="/notes/new" shouldRender={NewNote} />
              <PrivateRoute path="/notes/:id" shouldRender={Note} />
              <PrivateRoute path="/notes" shouldRender={NotesIndex} />
              <Route path="/share/:id" component={SharedNote} />
              <Route path="/signin" component={SignInPage} />
              <Route path="/login" component={LogInPage} />
              <Route path="/about" component={About} />
              <Route path="/" exact component={Home} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Fade>
      </TransitionGroup>
    </Layout>
  );
};

App.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(App);
