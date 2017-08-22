import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getNotesRequest } from '../actions/notes/getNotesActions';
import NotePreview from '../components/NotePreview';

class NotesIndex extends Component {
  componentWillMount() {
    this.props.getNotesRequest();
    // then
  }

  render() {
    return (
      <section className="notes-index">
        <div
          className="notes-index__content"
          ref={(content) => { this.content = content; }}
        >
          <h2 className="notes-index__heading">All notes: </h2>
          <ul className="notes-index__list">
            {this.props.notes ?
              Object.keys(this.props.notes).map(key => (
                <NotePreview key={key} note={this.props.notes[key]} />
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
