import React from 'react';
import LogInForm from './../containers/LogInForm';

const LogInPage = props => (
  <section className="content access-page access-page--primary">
    <div className="access-page__content">
      <LogInForm {...props} />
    </div>
  </section>
);

export default LogInPage;
