import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import queryString from 'query-string';

import NotePreview from './NotePreview';

const NotesList = (props) => {
  const query = queryString.parse(props.location.search);
  const path = props.location.pathname;

  const renderListContents = () => {
    if (props.notesToRender && props.notesToRender.length > 0) {
      return (
        <ul className="notes-list__list">
          {
            props.notesToRender.map(note => (
              <NotePreview key={note._id} note={note} />
            ))
          }
        </ul>
      );
    }
    if (props.error && props.error !== 'Not Found' && !props.isFetching) {
      return (
        <p className="notes-list__placeholder">
          <strong className="notes-list__placeholder-title">{props.error}</strong>
          We were unable to obtain your notes. Please try again later.
        </p>
      );
    }
    return (
      <p className="notes-list__placeholder">
        {props.placeHolder}
      </p>
    );
  };

  return (
    <section className={`content notes-list ${props.className}`}>
      <div className={'notes-list__content'}>
        { props.children }
        <header className="notes-list__heading">
          <h2 className="notes-list__heading-title">{`${props.name}:`}</h2>
          <span className="notes-list__heading-order">
            Sort by:
            <NavLink
              isActive={() => !!query.newest}
              to={`${path}${query.by ? `?by=${query.by}&newest=true` : '?newest=true'}`}
              className="notes-list__heading-link"
              activeClassName="notes-list__heading-link--active"
            >
              newest
            </NavLink>
            |
            <NavLink
              isActive={() => !query.newest}
              to={`${path}${query.by ? `?by=${query.by}` : ''}`}
              className="notes-list__heading-link"
              activeClassName="notes-list__heading-link--active"
            >
              oldest
            </NavLink>
          </span>
        </header>
        {renderListContents()}
      </div>
      <Link
        title="Add a new note"
        to={'/notes/new'}
        className="notes-list__new material-icons"
      >
        add
      </Link>
    </section>
  );
};

NotesList.defaultProps = {
  notesToRender: null,
  error: null,
  className: '',
};
/* eslint-disable */
NotesList.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  error: PropTypes.string, 
  isFetching: PropTypes.bool,
  placeHolder: PropTypes.string.isRequired,
  notesToRender: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.object.isRequired,
  children: PropTypes.element,
};
/* eslint-enable */

export default NotesList;
