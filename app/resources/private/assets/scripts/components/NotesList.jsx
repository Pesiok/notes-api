import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import queryString from 'query-string';

import NotePreview from './NotePreview';

const LoadingComponent = () => <span>Loading...</span>;

const NotesList = (props) => {
  const query = queryString.parse(props.location.search);
  const path = props.location.pathname;

  return (
    <section className="content notes-list">
      <div className="notes-list__content">
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
        <ul className="notes-list__list">
          {props.notesToRender ?
            props.notesToRender.map(note => (
              <NotePreview key={note._id} note={note} />
            )) :
            props.default()
          }
        </ul>
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
  nnotesToRender: null,
  default: LoadingComponent,
};

NotesList.propTypes = {
  name: PropTypes.string.isRequired,
  notesToRender: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.element,
  default: PropTypes.func,
};

export default NotesList;
