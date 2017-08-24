import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { getNotesRequest } from '../actions/notes/getNotesActions';
import NotesList from '../components/NotesList';

class NotesFilter extends Component {
  componentWillMount() {
    this.props.getNotesRequest();
  }

  render() {
    return <NotesList notes={this.props.notes} />;
  }
}

NotesFilter.defaultProps = {
  notes: null,
};

NotesFilter.propTypes = {
  getNotesRequest: PropTypes.func.isRequired,
  notes: PropTypes.objectOf(PropTypes.object),
};

const filterNotes = (params, notes) => {
  // todo
};

function mapStateToProps(state, ownProps) {
  const params = queryString.parse(ownProps.location.search);
  const notes = filterNotes(params, state.notesReducer);

  return { notes };
}

export default connect(mapStateToProps, { getNotesRequest })(NotesFilter);
