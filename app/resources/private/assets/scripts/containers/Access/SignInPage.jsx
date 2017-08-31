import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignInForm from '../../components/Access/SignInForm';
import { signInRequest } from '../../actions/user/signInActions';

const SignInPage = props => (
  <section className={`access-page access-page--secondary${props.error ? '-error' : ''}`}>
    <SignInForm
      {...props}
      className={props.isFetching ? 'loading-spinner loading-spinner--secondary' : ''}
    />
  </section>
);

SignInPage.defaultProps = {
  error: null,
};

SignInPage.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    error: state.ui.signIn.error,
    isFetching: state.ui.signIn.isFetching,
  };
}

export default connect(mapStateToProps, { signInRequest })(SignInPage);
