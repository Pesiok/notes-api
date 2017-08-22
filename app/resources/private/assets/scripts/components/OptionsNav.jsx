import React from 'react';
import PropTypes from 'prop-types';

const OptionsNav = props => (
  <nav className="note-nav">
    <ul className="note-nav__content">
      <li className={`note-nav__item ${props.showSet.showMarkdownEditor ? 'note-nav__item--set' : ''}`}>
        <button
          className="material-icons"
          title="Edit note"
          onClick={() => props.onSet('showMarkdownEditor')}
        >
          mode_edit
        </button>
      </li>
      <li className={`note-nav__item ${props.showSet.showShareOptions ? 'note-nav__item--set' : ''}`}>
        <button
          className="material-icons"
          title="Share note"
          onClick={() => props.onSet('showShareOptions')}
        >
          share
        </button>
      </li>
      <li className={`note-nav__item ${props.showSet.showTagsOptions ? 'note-nav__item--set' : ''}`}>
        <button
          className="material-icons"
          title="Tags"
          onClick={() => props.onSet('showTagsOptions')}
        >
          label
        </button>
      </li>
      <li className={`note-nav__item ${props.showSet.showDeleteOptions ? 'note-nav__item--set' : ''}`}>
        <button
          className="material-icons"
          title="Delete note"
          onClick={() => props.onSet('showDeleteOptions')}
        >
          delete
        </button>
      </li>
    </ul>
  </nav>
);

OptionsNav.propTypes = {
  onSet: PropTypes.func.isRequired,
  showSet: PropTypes.shape({
    showMarkdownEditor: PropTypes.bool.isRequired,
    showShareOptions: PropTypes.bool.isRequired,
    showTagsOptions: PropTypes.bool.isRequired,
    showDeleteOptions: PropTypes.bool.isRequired,
  }).isRequired,
};

export default OptionsNav;
