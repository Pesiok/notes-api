import React from 'react';
import SignInForm from './../containers/SignInForm';
import LogInForm from './../containers/LogInForm';

export default props => (
  <main className="home">
    <header className="home__header">
      <h2>Hi there!</h2>
      <p>This app allows you to create and share markdown flavored notes</p>
    </header>
    <div>
      <SignInForm {...props} />
      <LogInForm {...props} />
    </div>
    <footer>
      <p>I hope it works. 2017</p>
    </footer>
  </main>
);
