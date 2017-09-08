import React from 'react';
import PropTypes from 'prop-types';
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';

// thanks to: 
// http://shuheikagawa.com/blog/2015/09/21/using-highlight-js-with-marked/

const renderer = new Renderer();
renderer.code = (code, lang) => {
  const isLangValid = !!(lang && highlightjs.getLanguage(lang));
  const highlighted = isLangValid ? highlightjs.highlight(lang, code).value : code;

  return `<pre><code class="hljs ${lang}">${highlighted}</code></pre>`;
};

marked.setOptions({ renderer, sanitize: true });


const transpile = (value) => {
  const transpiled = marked(value);
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
