import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import SharedNotePreview from '../../components/Notes/Shared/SharedNotePreview';
// actions & action creators
import { getSharedNoteRequest } from '../../actions/shared/getSharedNoteActions';


const findNoteAuthor = (note) => {
  const id = note._author;
  return fetch(`/api/users/find/id/${id}`)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    });
};

class SharedNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: null,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.props.getSharedNoteRequest(id)
        .then(() => findNoteAuthor(this.props.note))
        .then(author => this.setState(state => Object.assign({}, state, { author })));
    }
  }

  render() {
    return (
      <SharedNotePreview
        {...this.props}
        author={this.state.author}
      />
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
  return {
    note: state.shared[id],
    error: state.ui.getSharedNote.error,
    isFetching: state.ui.getSharedNote.isFetching,
  };
}

export default connect(mapStateToProps, { getSharedNoteRequest })(SharedNote);
