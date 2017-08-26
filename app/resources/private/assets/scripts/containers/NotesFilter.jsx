import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { getNotesRequest } from '../actions/notes/getNotesActions';

import NotesList from '../components/NotesList';
import TagFilter from '../components/TagFilter';

const Default = () => <div>No notes to display</div>;

class NotesFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: this.props.notes,
      filtredNotes: this.props.notes,
    };

    this.handleTagFilter = this.handleTagFilter.bind(this);
  }

  componentWillMount() {
    this.props.getNotesRequest();
  }

  handleTagFilter(filtredNotes) {
    this.setState(state => Object.assign({}, state, { filtredNotes }));
    console.log(filtredNotes);
  }

  render() {
    return (
      <NotesList
        notes={this.state.filtredNotes}
        name={this.props.name}
        default={Default}
        {...this.props}
      >
        <TagFilter
          notes={this.state.notes}
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
    notes: filterNotes(params, state.notesReducer),
    name: params.by,
  };
}

export default connect(mapStateToProps, { getNotesRequest })(NotesFilter);
