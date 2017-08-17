import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions creators
import { getNoteRequest } from '../actions/notes/getNoteActions';
import { updateNoteRequest } from '../actions/notes/updateNoteActions';
import { deleteNoteRequest } from '../actions/notes/deleteNoteActions';
import { newNoteRequest } from '../actions/notes/newNoteActions';

// components
import MarkdownPreviewer from '../components/MarkdownPreviewer';
import MarkdownEditor from '../components/MarkdownEditor';
import NoteTitle from '../components/NoteTitle';
import ShareOptions from '../components/ShareOptions';
import TagsOptions from '../components/TagsOptions';
import DeleteOptions from '../components/DeleteOptions';
import OptionsNav from '../components/OptionsNav';

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

  componentWillMount() {
    const id = this.props.match.params.id;
    if (id) this.props.getNoteRequest(id);
  }

  // delete note
  deleteHandler() {
    const id = this.props.match.params.id;
    this.props.deleteNoteRequest(id)
      .then(() => this.props.history.push('/notes'));
  }

  saveHandler() {
    const id = this.props.match.params.id;

    if (id) {
      this.props.updateNoteRequest(id, this.state.note);
    } else {
      this.props.newNoteRequest(this.state.note)
        .then(data => this.props.history.push(`/notes/${data.note._id}`));
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
    return (
      <section>
        <NoteTitle
          value={this.state.note.title}
          onSave={this.saveHandler}
          onChange={this.changeHandler}
        />
        <MarkdownPreviewer
          value={this.state.note.content}
        />
        <OptionsNav onSet={this.tabsHandler} />
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
      </section>
    );
  }
}

Note.defaultProps = {
  note: null,
  URLRoot: window.location.origin,
};

Note.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  note: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  URLRoot: PropTypes.string,
  getNoteRequest: PropTypes.func.isRequired,
  updateNoteRequest: PropTypes.func.isRequired,
  deleteNoteRequest: PropTypes.func.isRequired,
  newNoteRequest: PropTypes.func.isRequired,
};

const dummyNote = {
  title: 'A Dummy note',
  content: 'Click on the edit tab to write here soomething... Markdown included',
  meta: {
    tags: ['dummy'],
  },
  share: {
    isShared: false,
  },
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  // if there is no id in URL pass a dummy note
  return { note: id ? state.notesReducer[id] : dummyNote };
}

export default connect(mapStateToProps, {
  getNoteRequest,
  updateNoteRequest,
  deleteNoteRequest,
  newNoteRequest,
})(Note);
