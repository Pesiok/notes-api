import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LogInForm from '../../components/Access/LogInForm';
import { logInRequest } from '../../actions/user/logInActions';
import { RESET_LOG_IN_ERROR } from '../../actions/ui/resetErrorActions';

const LogInPage = props => (
  <section className={`access-page access-page--primary${props.error ? '-error' : ''}`}>
    <LogInForm
      {...props}
      className={props.isFetching ? 'loading-spinner loading-spinner--primary' : ''}
    />
  </section>
);

LogInPage.defaultProps = {
  error: null,
};

LogInPage.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    logInRequest: data => dispatch(logInRequest(data)),
    resetErrorMsg: () => dispatch({ type: RESET_LOG_IN_ERROR }),
  };
}

function mapStateToProps(state) {
  return {
    error: state.ui.logIn.error,
    isFetching: state.ui.logIn.isFetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
