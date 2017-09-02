import React from 'react';
import PropTypes from 'prop-types';

// components
import MarkdownPreviewer from '../Note/MarkdownPreviewer';

const SharedNotePreview = ({ note }) => (
  <section className="content shared-note">
    {note &&
      <div>
        <h2>{note.title}</h2>
        <MarkdownPreviewer value={note.content} />
      </div>
    }
  </section>
);

SharedNotePreview.defaultProps = {
  note: null,
};

SharedNotePreview.propTypes = {
  note: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default SharedNotePreview;
