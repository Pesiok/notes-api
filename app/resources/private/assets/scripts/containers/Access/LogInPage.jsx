import React from 'react';
import { connect } from 'react-redux';

import LogInForm from '../../components/Access/LogInForm';
import { logInRequest } from '../../actions/user/logInActions';

const LogInPage = props => (
  <section className="access-page access-page--primary">
    <LogInForm {...props} />
  </section>
);

export default connect(null, { logInRequest })(LogInPage);
