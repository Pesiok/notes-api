import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNotesRequest } from '../actions/notesActions';

class NotesIndex extends Component {
  componentWillMount() {
    this.props.getNotesRequest();
  }

  renderNotes() {
    const notes = this.props.notes;
    if (!notes) return <span>Loading...</span>;

    return notes.map(note => (
      // eslint-disable-next-line
      <Link key={note._id} to={`/notes/${_id}`}>
        <li>
          {note.content}
        </li>
      </Link>
    ));
  }

  render() {
    return (
      <section>
        <h2>Your notes: </h2>
        <ul>
          {this.renderNotes()}
        </ul>
      </section>
    );
  }
}

NotesIndex.propTypes = {
  getNotesRequest: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    notes: state.notesReducer.notes,
  };
}

export default connect(mapStateToProps, { getNotesRequest })(NotesIndex);
