import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions creators
import { getNoteRequest } from '../actions/notes/getNoteActions';
import { updateNoteRequest } from '../actions/notes/updateNoteActions';
import { deleteNoteRequest } from '../actions/notes/deleteNoteActions';

// components
import MarkdownPreviewer from '../components/MarkdownPreviewer';
import NoteTitle from '../components/NoteTitle';
import ShareOptions from '../components/ShareOptions';
import TagsOptions from '../components/TagsOptions';

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
    };

    this.tabsHandler = this.tabsHandler.bind(this);
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
          value={this.props.note.title}
          onSave={this.saveHandler}
        />
        <MarkdownPreviewer
          value={this.props.note.content}
          onSave={this.saveHandler}
          showEditor={this.state.options.showMarkdownEditor}
        />
        {this.state.options.showShareOptions &&
          <ShareOptions
            value={this.props.note.share}
            url={`${this.props.URLRoot}/share/${this.props.note._id}`}
            onSave={this.saveHandler}
          />
        }
        {this.state.options.showTagsOptions &&
          <TagsOptions
            value={this.props.note.meta.tags}
            onSave={this.saveHandler}
          />
        }
        <nav>
          <ul>
            <li><button onClick={() => this.tabsHandler('showMarkdownEditor')}>Edit</button></li>
            <li><button onClick={() => this.tabsHandler('showShareOptions')}>Share</button></li>
            <li><button onClick={() => this.tabsHandler('showTagsOptions')}>Tags</button></li>
            <li><button onClick={() => this.tabsHandler('showDeleteOptions')}>Delete</button></li>
          </ul>
        </nav>
      </section>
    );
  }
}

Note.defaultProps = {
  note: null,
  URLRoot: window.location.origin,
};

Note.propTypes = {
  note: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  URLRoot: PropTypes.string,
  getNoteRequest: PropTypes.func.isRequired,
  updateNoteRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  return {
    note: state.notesReducer[id],
  };
}

export default connect(mapStateToProps, {
  getNoteRequest,
  updateNoteRequest,
  deleteNoteRequest,
})(Note);
