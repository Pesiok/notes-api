import React from 'react';
import PropTypes from 'prop-types';

const OptionsNav = props => (
  <nav>
    <ul>
      <li><button onClick={() => props.onSet('showMarkdownEditor')}>Edit</button></li>
      <li><button onClick={() => props.onSet('showShareOptions')}>Share</button></li>
      <li><button onClick={() => props.onSet('showTagsOptions')}>Tags</button></li>
      <li><button onClick={() => props.onSet('showDeleteOptions')}>Delete</button></li>
    </ul>
  </nav>
);

OptionsNav.propTypes = {
  onSet: PropTypes.func.isRequired,
};

export default OptionsNav;
