import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="access-page anim-bg-secondary--error">
    <div className="not-found">
      <header className="not-found__header">
        <h2 className="not-found__header-title">
          404
        </h2>
        <p className="not-found__header-info">
          Page Not Found :(
        </p>
      </header>
      <Link to="/" className="not-found__link">
        Go to main page
      </Link>
    </div>
  </section>
);

export default NotFound;
