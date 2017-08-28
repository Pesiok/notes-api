import React, { Component } from 'react';
import SignInForm from './../containers/SignInForm';
import LogInForm from './../containers/LogInForm';

class Home extends Component {
  componentDidMount() {
    window.setTimeout(() => this.header.classList.add('home__header--blur'), 250);
  }

  // componentWillUnmount() {
  //   this.header.classList.remove('home__header--blur');
  // }

  getElement(element) {
    if (element) this.header = element;
  }

  render() {
    return (
      <section className="content home">
        <div className="home__content">
          <header
            className="home__header"
            ref={(element) => { this.header = element; }}
          >
            <h2 className="home__header-heading">Hi there!</h2>
            <p className="home__header-para">
            This app allows you to create and share Markdown flavored notes.
            </p>
            <p className="home__header-para">
            And yes, this background image is random.
            </p>
          </header>
          <div className="home__forms">
            <SignInForm {...this.props} />
            <LogInForm {...this.props} />
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
