import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

const transpile = (value) => {
  const transpiled = marked(value, { sanitize: true });
  return { __html: transpiled };
};

/*eslint-disable */
const MarkdownPreviewer = props => (
  <div
    className="note__preview"
    dangerouslySetInnerHTML={transpile(props.value)} 
  />
);
/*eslint-enable */

MarkdownPreviewer.propTypes = {
  value: PropTypes.string.isRequired,
};

export default MarkdownPreviewer;
