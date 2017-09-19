import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="content home">
    <div className="home__content">
      <header className="home__header home__header--blur">
        <h2 className="home__header-heading">Hi there!</h2>
        <p className="home__header-para">
            This app allows you to create and share Markdown flavored notes.
        </p>
        <p className="home__header-para">
            And yes, this background image is pretty much random.
        </p>
      </header>
      <div className="home__links">
        <div className="home__links-container home__links-container--secondary">
          <h3 className="home__links-heading home__links-heading--secondary">
                Don&#39;t have an account yet?
          </h3>
          <Link to="/signin" className="home__links-button home__links-button--secondary">
                Sign up
          </Link>
        </div>
        <div className="home__links-container home__links-container--primary">
          <h3 className="home__links-heading home__links-heading--primary">
                Already have an account?
          </h3>
          <Link to="/login" className="home__links-button home__links-button--primary">
                Log in
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Home;
