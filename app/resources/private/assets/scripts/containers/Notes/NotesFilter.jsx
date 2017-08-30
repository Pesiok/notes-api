import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { getNotesRequest } from '../../actions/notes/getNotesActions';

import NotesList from '../../components/Notes/NotesList';
import TagFilter from '../../components/Notes/TagFilter';

const Default = () => <div>No notes to display</div>;

const tagFilter = (notes, filterValue) => notes.filter((note) => {
  const mached = note.meta.tags.map(tag => tag === filterValue);
  const atLeastOneMatches = mached.some(value => value === true);
  return atLeastOneMatches;
});

class NotesFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredNotes: this.props.notes,
      value: '',
    };

    this.handleTagFilter = this.handleTagFilter.bind(this);
  }

  componentDidMount() {
    this.props.getNotesRequest();
  }

  componentWillReceiveProps({ notes }) {
    const value = this.state.value;
    const filteredNotes = value.length > 0 ? tagFilter(notes, value) : notes;

    this.setState(state => Object.assign({}, state, { filteredNotes }));
  }

  handleTagFilter(value) {
    const notes = this.props.notes;
    const filteredNotes = value.length === 0 ? notes : tagFilter(notes, value);

    this.setState(state => Object.assign({}, state, { filteredNotes, value }));
  }

  render() {
    return (
      <NotesList
        notesToRender={this.state.filteredNotes}
        name={this.props.name}
        default={Default}
        {...this.props}
      >
        <TagFilter
          onSave={this.handleTagFilter}
        />
      </NotesList>
    );
  }
}

NotesFilter.defaultProps = {
  name: 'Notes',
  notes: null,
};

NotesFilter.propTypes = {
  getNotesRequest: PropTypes.func.isRequired,
  name: PropTypes.string,
  notes: PropTypes.arrayOf(PropTypes.object),
};

const filterNotes = (params, notes) => {
  const sortedNotes = [];
  let sortedKeys;

  switch (params.by) {
    case 'edited': {
      sortedKeys = Object.keys(notes)
        .filter(key => typeof notes[key].meta.edited === 'string');
      break;
    }
    case 'shared': {
      sortedKeys = Object.keys(notes)
        .filter(key => notes[key].share.isShared === true);
      break;
    }
    default: {
      sortedKeys = Object.keys(notes);
      break;
    }
  }
  sortedKeys.forEach(key => sortedNotes.push(notes[key]));
  if (params.newest) sortedNotes.reverse();
  return sortedNotes;
};

function mapStateToProps(state, ownProps) {
  const params = queryString.parse(ownProps.location.search);

  return {
    notes: filterNotes(params, state.notes),
    name: params.by,
  };
}

export default connect(mapStateToProps, { getNotesRequest })(NotesFilter);
