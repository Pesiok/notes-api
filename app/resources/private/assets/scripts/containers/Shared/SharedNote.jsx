import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import SharedNotePreview from '../../components/Notes/Shared/SharedNotePreview';
// actions & action creators
import { getSharedNoteRequest } from '../../actions/shared/getSharedNoteActions';

class SharedNote extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) this.props.getSharedNoteRequest(id);
  }

  render() {
    return (
      <SharedNotePreview note={this.props.note} />
    );
  }
}

SharedNote.defaultProps = {
  note: null,
};

SharedNote.propTypes = {
  note: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  getSharedNoteRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  // console.log(state.shared[id]);
  return {
    note: state.shared[id],
  };
}

export default connect(mapStateToProps, { getSharedNoteRequest })(SharedNote);
