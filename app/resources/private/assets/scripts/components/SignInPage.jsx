import React from 'react';
import SignInForm from './../containers/SignInForm';

const SignInPage = props => (
  <section className="access-page access-page--secondary">
    <SignInForm {...props} />
  </section>
);

export default SignInPage;
