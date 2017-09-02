import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignInForm from '../../components/Access/SignInForm';
import { signInRequest } from '../../actions/user/signInActions';
import { RESET_SIGN_IN_ERROR } from '../../actions/ui/resetErrorActions';

const SignInPage = props => (
  <section className={`access-page anim-bg-secondary${props.error ? '--error' : ''}`}>
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

function mapDispatchToProps(dispatch) {
  return {
    signInRequest: data => dispatch(signInRequest(data)),
    resetErrorMsg: () => dispatch({ type: RESET_SIGN_IN_ERROR }),
  };
}

function mapStateToProps(state) {
  return {
    error: state.ui.signIn.error,
    isFetching: state.ui.signIn.isFetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
