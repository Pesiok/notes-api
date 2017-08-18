import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNotesRequest } from '../actions/notes/getNotesActions';

const formatDateTime = timestamp => new Date(timestamp).toLocaleString();
const formatTitle = (title) => {
  const maxLength = 20;
  if (title.length > maxLength) {
    return `${title.substring(0, maxLength)}...`;
  }
  return title;
};

class NotesIndex extends Component {
  componentWillMount() {
    this.props.getNotesRequest();
  }

  renderNotes() {
    const notes = this.props.notes;
    if (!notes) return <span>Loading...</span>;

    return Object.keys(notes).map(key => (
      <Link
        key={key}
        to={`/notes/${key}`}
        className="note-preview"
      >
        <li className="note-preview__content">
          <h3 className="note-preview__heading">{formatTitle(notes[key].title)}</h3>
          {notes[key].share.isShared &&
            <strong className="note-preview__status">Shared</strong>
          }
          {notes[key].meta.edited ?
            <time className="note-preview__time">Last edited: {formatDateTime(notes[key].meta.edited)}</time> :
            <time className="note-preview__time">Created: {formatDateTime(notes[key].meta.created)}</time>
          }
        </li>
      </Link>
    ));
  }

  render() {
    return (
      <section className="notes-index">
        <div className="notes-index__content">
          <h2 className="notes-index__heading">All notes: </h2>
          <ul className="notes-index__list">
            {this.renderNotes()}
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
  }
}

NotesIndex.defaultProps = {
  notes: null,
};

NotesIndex.propTypes = {
  getNotesRequest: PropTypes.func.isRequired,
  notes: PropTypes.objectOf(PropTypes.object),
};

function mapStateToProps(state) {
  return {
    notes: state.notesReducer,
  };
}

export default connect(mapStateToProps, { getNotesRequest })(NotesIndex);
