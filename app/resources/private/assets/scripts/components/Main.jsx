import React from 'react';
import SignInForm from './../containers/SignInForm';
// import LogInForm from './../containers/LoginForm';

export default () => (
  <main>
    <header>
      <h1>Hi there, this app allows you to create and share notes</h1>
      <p>Use forms below</p>
    </header>
    <div>
      <SignInForm />
      {/* <LogInForm /> */}
    </div>
    <footer>
      <p>I hope it works. 2017</p>
    </footer>
  </main>
);
