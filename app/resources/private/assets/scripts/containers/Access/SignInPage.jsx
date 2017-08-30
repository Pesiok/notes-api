import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignInForm from '../../components/Access/SignInForm';
import { signInRequest } from '../../actions/user/signInActions';

const SignInPage = props => (
  <section className="access-page access-page--secondary">
    <SignInForm {...props} />
  </section>
);

export default connect(null, { signInRequest })(SignInPage);
