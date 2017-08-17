import React from 'react';
import PropTypes from 'prop-types';

const MarkdownEditor = props => (
  <div>
    <textarea
      type="text"
      value={props.value}
      onChange={event => props.onChange(event.target.value, 'content')}
    />
    <button onClick={props.onSave}>Save</button>
  </div>
);

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MarkdownEditor;
