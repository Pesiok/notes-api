import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';

// components
import NotesListError from './NotesListError';
import ListContents from './ListContents';

const NotesList = (props) => {
  const query = queryString.parse(props.location.search);
  const path = props.location.pathname;

  return (
    <section className={`content notes-list ${props.className}`}>
      <div className={'notes-list__content'}>
        <NotesListError {...props} />
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
        <ListContents {...props} />
      </div>
    </section>
  );
};

NotesList.defaultProps = {
  notesToRender: null,
  error: null,
  className: '',
};

NotesList.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
/* eslint-disable */
  location: PropTypes.object.isRequired,
  children: PropTypes.element,
};
/* eslint-enable */

export default NotesList;
