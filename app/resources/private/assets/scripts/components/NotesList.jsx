import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import NotePreview from './NotePreview';

const NotesList = props => (
  <section className="content notes-index">
    <div className="notes-index__content">
      <h2 className="notes-index__heading">All notes: </h2>
      <ul className="notes-index__list">
        {props.notes ?
          Object.keys(props.notes).map(key => (
            <NotePreview key={key} note={props.notes[key]} />
          )) :
          <span>Loading...</span>
        }
      </ul>
    </div>
    <Link
      title="Add a new note"
      to={'/notes/new'}
      className="notes-index__new material-icons"
    >
      add
    </Link>
  </section>
);

NotesList.defaultProps = {
  notes: null,
};

NotesList.propTypes = {
  notes: PropTypes.objectOf(PropTypes.object),
};

export default NotesList;
