import React from 'react';
import LogInForm from './../containers/LogInForm';

const LogInPage = props => (
  <section className="access-page access-page--primary">
    <LogInForm {...props} />
  </section>
);

export default LogInPage;
