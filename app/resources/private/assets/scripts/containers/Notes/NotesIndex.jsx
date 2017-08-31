import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { getNotesRequest } from '../../actions/notes/getNotesActions';
import NotesList from '../../components/Notes/NotesList';


class NotesIndex extends Component {
  componentDidMount() {
    this.props.getNotesRequest();
    // .then loading animation or sth...
  }

  render() {
    return (
      <NotesList
        notesToRender={this.props.notes}
        name="All notes"
        placeHolder="There is no notes to display :("
        {...this.props}
      />
    );
  }
}

NotesIndex.defaultProps = {
  notes: null,
};

NotesIndex.propTypes = {
  getNotesRequest: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object),
};

const parseNotes = (notes, params) => {
  if (!notes) return null;

  const parsedNotes = Object.keys(notes).map(key => notes[key]);
  if (params.newest) parsedNotes.reverse();
  return parsedNotes;
};

function mapStateToProps(state, ownProps) {
  const params = queryString.parse(ownProps.location.search);

  return {
    notes: parseNotes(state.notes, params),
    isFetching: state.ui.getNotes.isFetching,
    error: state.ui.getNotes.error,
  };
}

export default connect(mapStateToProps, { getNotesRequest })(NotesIndex);
