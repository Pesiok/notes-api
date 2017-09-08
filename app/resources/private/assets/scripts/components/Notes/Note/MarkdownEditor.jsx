import React from 'react';
import PropTypes from 'prop-types';

import FadeAndSlideIn from '../../Utilis/FadeAndSlideIn';

const MarkdownEditor = props => (
  <FadeAndSlideIn in>
    <div className="note-options-editor">
      <textarea
        className="note-options-editor__input"
        type="text"
        value={props.value}
        onChange={event => props.onChange(event.target.value, 'content')}
      />
      <button
        className="note-options-editor__button"
        onClick={props.onSave}
      >
      Save
      </button>
    </div>
  </FadeAndSlideIn>
);

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MarkdownEditor;
