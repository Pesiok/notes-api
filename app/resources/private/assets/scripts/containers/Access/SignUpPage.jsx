import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignUpForm from '../../components/Access/SignUpForm';
import { signUpRequest } from '../../actions/user/signUpActions';
import { RESET_SIGN_UP_ERROR } from '../../actions/ui/resetErrorActions';

const SignUpPage = props => (
  <section className={`access-page anim-bg-secondary${props.error ? '--error' : ''}`}>
    <SignUpForm
      {...props}
      className={props.isFetching ? 'loading-spinner loading-spinner--secondary' : ''}
    />
  </section>
);

SignUpPage.defaultProps = {
  error: null,
};

SignUpPage.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    signInRequest: data => dispatch(signUpRequest(data)),
    resetErrorMsg: () => dispatch({ type: RESET_SIGN_UP_ERROR }),
  };
}

function mapStateToProps(state) {
  return {
    error: state.ui.signUp.error,
    isFetching: state.ui.signUp.isFetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
