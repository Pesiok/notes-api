import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// For the sake of consistency with Route's component API
// 'shouldRender' prop should be named 'component', but...
// Unforunetly, right now it shows unnecessary warnings in the console

const PrivateRoute = (routeProps) => {
  const { shouldRender: Component, isAuthenticated } = routeProps;
  return (
    <Route
      {...routeProps}
      render={props => (isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
    />
  );
};

PrivateRoute.propTypes = {
  location: PropTypes.object, // eslint-disable-line
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userReducer.isAuthenticated,
  };
}

export default connect(mapStateToProps, null)(PrivateRoute);
