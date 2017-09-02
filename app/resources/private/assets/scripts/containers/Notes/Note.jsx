import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions & actions creators
import {
  RESET_GET_NOTE_ERROR,
  RESET_NEW_NOTE_ERROR,
  RESET_UPDATE_NOTE_ERROR,
  RESET_DELETE_NOTE_ERROR,
} from '../../actions/ui/resetErrorActions';
import { getNoteRequest } from '../../actions/notes/getNoteActions';
import { updateNoteRequest } from '../../actions/notes/updateNoteActions';
import { deleteNoteRequest } from '../../actions/notes/deleteNoteActions';
import { newNoteRequest } from '../../actions/notes/newNoteActions';

// components
import MarkdownPreviewer from '../../components/Notes/Note/MarkdownPreviewer';
import MarkdownEditor from '../../components/Notes/Note//MarkdownEditor';
import NoteTitle from '../../components/Notes/Note/NoteTitle';
import ShareOptions from '../../components/Notes/Note/ShareOptions';
import TagsOptions from '../../components/Notes/Note/TagsOptions';
import DeleteOptions from '../../components/Notes/Note/DeleteOptions';
import OptionsNav from '../../components/Notes/Note/OptionsNav';
import NoteError from '../../components/Notes/Note/NoteError';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        showMarkdownEditor: false,
        showShareOptions: false,
        showTagsOptions: false,
        showDeleteOptions: false,
      },
      note: {
        content: this.props.note.content,
        title: this.props.note.title,
        share: this.props.note.share,
        meta: this.props.note.meta,
      },
    };

    // bindings
    this.tabsHandler = this.tabsHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) this.props.requests.getNoteRequest(id);
  }

  deleteHandler() {
    const id = this.props.match.params.id;
    this.props.requests.deleteNoteRequest(id)
      .then(() => {
        if (!this.props.errors.deleteError) {
          this.props.history.push('/notes');
        }
      });
  }

  saveHandler() {
    const id = this.props.match.params.id;

    // if there is no id in url treat it like new note request
    if (id) {
      this.props.requests.updateNoteRequest(id, this.state.note);
    } else {
      this.props.requests.newNoteRequest(this.state.note)
        .then((data) => {
          if (!this.props.errors.createError) {
            this.props.history.push(`/notes/${data.note._id}`);
          }
        });
    }
  }

  changeHandler(value, type) {
    const note = Object.assign({}, this.state.note);
    note[type] = value;
    this.setState(state => Object.assign({}, state, { note }));
  }

  // nav UI handlers
  tabsHandler(type) {
    const options = {};
    // eslint-disable-next-line
    Object.keys(this.state.options).map(key => options[key] = (key === type) ? !this.state.options[key] : false);
    this.setState(state => Object.assign({}, state, { options }));
  }

  render() {
    const { isUpdating, isDeleting, isCreating, isGetting } = this.props.fetchingState;
    const noteContainerClasses = `note__container ${
      (isUpdating || isDeleting || isCreating) ? 'loading-spinner loading-spinner--primary' : ''
    }`;
    const noteClasses = `content note ${
      isGetting ? 'loading-bar loading-bar--primary' : ''
    }`;

    return (
      <section className={noteClasses}>
        <div className="note__content">
          <div className={noteContainerClasses}>
            <NoteTitle
              value={this.state.note.title}
              onSave={this.saveHandler}
              onChange={this.changeHandler}
            />
            <MarkdownPreviewer
              value={this.state.note.content}
              {...this.props}
            />
          </div>
          <NoteError {...this.props} />
          <OptionsNav
            onSet={this.tabsHandler}
            showSet={this.state.options}
          />
          <div className="note-options">
            <div className="note-options__content">
              {this.state.options.showMarkdownEditor &&
                <MarkdownEditor
                  value={this.state.note.content}
                  onChange={this.changeHandler}
                  onSave={this.saveHandler}
                />
              }
              {this.state.options.showShareOptions &&
                <ShareOptions
                  value={this.state.note.share}
                  url={this.props.note._id ?
                    `${this.props.URLRoot}/share/${this.props.note._id}` :
                    'Create note first to get sharable link.'}
                  onChange={this.changeHandler}
                  onSave={this.saveHandler}
                />
              }
              {this.state.options.showTagsOptions &&
                <TagsOptions
                  value={this.state.note.meta}
                  onSave={this.saveHandler}
                  onChange={this.changeHandler}
                />
              }
              {this.state.options.showDeleteOptions &&
                <DeleteOptions onDelete={this.deleteHandler} />
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// config

Note.defaultProps = {
  note: null,
  URLRoot: window.location.origin,
};

Note.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  note: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  URLRoot: PropTypes.string,
  requests: PropTypes.shape({
    getNoteRequest: PropTypes.func.isRequired,
    updateNoteRequest: PropTypes.func.isRequired,
    deleteNoteRequest: PropTypes.func.isRequired,
    newNoteRequest: PropTypes.func.isRequired,
  }).isRequired,
  fetchingState: PropTypes.shape({
    isUpdating: PropTypes.bool.isRequired,
    isDeleting: PropTypes.bool.isRequired,
    isCreating: PropTypes.bool.isRequired,
    isGetting: PropTypes.bool.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    deleteError: PropTypes.string,
    createError: PropTypes.string,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    requests: {
      getNoteRequest: data => dispatch(getNoteRequest(data)),
      updateNoteRequest: (id, data) => dispatch(updateNoteRequest(id, data)),
      deleteNoteRequest: data => dispatch(deleteNoteRequest(data)),
      newNoteRequest: data => dispatch(newNoteRequest(data)),
    },
    resetErrors: {
      updateError: () => dispatch({ type: RESET_UPDATE_NOTE_ERROR }),
      deleteError: () => dispatch({ type: RESET_DELETE_NOTE_ERROR }),
      createError: () => dispatch({ type: RESET_NEW_NOTE_ERROR }),
      getError: () => dispatch({ type: RESET_GET_NOTE_ERROR }),
    },
  };
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;

  return {
    // if there is no id in the URL pass a dummy note
    note: id ? state.notes[id] : ownProps.note,
    fetchingState: {
      isUpdating: state.ui.updateNote.isFetching,
      isDeleting: state.ui.deleteNote.isFetching,
      isCreating: state.ui.newNote.isFetching,
      isGetting: state.ui.getNote.isFetching,
    },
    errors: {
      updateError: state.ui.updateNote.error,
      deleteError: state.ui.deleteNote.error,
      createError: state.ui.newNote.error,
      getError: state.ui.getNote.error,
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
