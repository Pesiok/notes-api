import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNotesRequest } from '../actions/notes/getNotesActions';

class NotesIndex extends Component {
  componentWillMount() {
    this.props.getNotesRequest();
  }

  renderNotes() {
    const notes = this.props.notes;
    if (!notes) return <span>Loading...</span>;

    return Object.keys(notes).map(key => (
      <Link key={key} to={`/notes/${key}`}>
        <li>
          {notes[key].title}
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
