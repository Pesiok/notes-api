import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNoteRequest } from '../actions/notes/getNoteActions';
import { updateNoteRequest } from '../actions/notes/updateNoteActions';
import { deleteNoteRequest } from '../actions/notes/deleteNoteActions';
import MarkdownPreviewer from '../components/MarkdownPreviewer';

class Note extends Component {
  constructor(props) {
    super(props);

    this.saveHandler = this.updateNoteRequestWithId.bind(this);
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.getNoteRequest(id);
  }

  updateNoteRequestWithId(value) {
    const id = this.props.match.params.id;
    this.props.updateNoteRequest(id, value);
  }

  render() {
    return (
      <section>
        <h2>{this.props.note.title}</h2>
        <MarkdownPreviewer
          value={this.props.note.content}
          onSave={this.saveHandler}
        />
        <Link to={'/notes'}>Go back </Link>
      </section>
    );
  }
}

Note.defaultProps = {
  note: null,
};

Note.propTypes = {
  note: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  getNoteRequest: PropTypes.func.isRequired,
  updateNoteRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    note: state.notesReducer.notes // eslint-disable-next-line
      .filter(note => note._id === ownProps.match.params.id)[0]
  };
}

export default connect(mapStateToProps, {
  getNoteRequest,
  updateNoteRequest,
  deleteNoteRequest,
})(Note);
