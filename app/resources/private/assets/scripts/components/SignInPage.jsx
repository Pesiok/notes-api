import React from 'react';
import SignInForm from './../containers/SignInForm';

const SignInPage = props => (
  <section className="content access-page access-page--secondary">
    <div className="access-page__content">
      <SignInForm {...props} />
    </div>
  </section>
);

export default SignInPage;
