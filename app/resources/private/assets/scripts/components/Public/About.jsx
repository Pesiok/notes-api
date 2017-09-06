import React from 'react';

const About = () => (
  <section className="content about">
    <div className="about__content">
      <h2 className="about__title">
        About this site
      </h2>
      <p>
        It&#39;s just another one this &#39;markdown notes app&#39; available throughout the web.
      </p>
      <p>
        This one is not much different besides share/unshare on demand feature.
        Right now it&#39;s more of a proof-of-concept that a real thing.
        But I&#39;m planning on developing it little by little in the meantime.
        At least I hope so.
      </p>
      <p>Truly, reinventing the wheel at its finest.
        But hey, I learned a few things while making it.
      </p>
      <h3 className="about__title-sub">
        Planned features:
      </h3>
      <ol className="about__list">
        <li>
          Keeping notes shared to users in theirs &#39;all notes&#39; tab.
          Adding them to filters.
        </li>
        <li>
          Log out from all devices option.
        </li>
        <li>
          More formating options: syntax highlighting, emoticons, etc.
        </li>
        <li>
          Ability to change UI settings, reset password.
        </li>
        <li>
          ... ?
        </li>
      </ol>
    </div>
    <ul className="about__details">
      <a
        className="about__details-link"
        href="https://github.com/Pesiok/notes-app"
      >
        <li>
          <span
            aria-hidden="true"
            className="material-icons about__details-icon"
          >
            code
          </span>
            Source code
        </li>
      </a>
      <a
        className="about__details-link"
        href="mailto:pesiok@gmail.com"
      >
        <li>
          <span
            aria-hidden="true"
            className="material-icons about__details-icon"
          >
            email
          </span>
            Write to me
        </li>
      </a>
    </ul>
  </section>
);

export default About;
