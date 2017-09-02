import React from 'react';
import PropTypes from 'prop-types';

// components
import MarkdownPreviewer from '../Note/MarkdownPreviewer';
import SharedNoteError from './SharedNoteError';
import SharedNoteDetails from './SharedNoteDetails';

const SharedNotePreview = ({ note, author, error, isFetching }) => (
  <section className={`
      content shared-note 
      ${error ? 'anim-bg-secondary--error' : ''} 
      ${isFetching ? 'loading-bar loading-bar--secondary' : ''}`
  }
  >
    <div className={'shared-note__content'}>
      {note &&
        <div>
          <header className="shared-note__header">
            <h2 className="shared-note__header-title">{note.title}</h2>
            <span className="shared-note__header-author">
              By: {author ? author.name : 'looking for author...'}
            </span>
          </header>
          <MarkdownPreviewer value={note.content} />
          <SharedNoteDetails note={note} />
        </div>
      }
      {(!note && error) &&
        <SharedNoteError error={error} />
      }
    </div>
  </section>
);

SharedNotePreview.defaultProps = {
  note: null,
  author: null,
  error: null,
};

SharedNotePreview.propTypes = {
  note: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default SharedNotePreview;
