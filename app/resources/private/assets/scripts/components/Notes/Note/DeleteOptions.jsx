import React from 'react';
import PropTypes from 'prop-types';

import FadeAndSlideIn from '../../Utilis/FadeAndSlideIn';

const DeleteOptions = props => (
  <FadeAndSlideIn in>
    <div className="note-options-delete">
      <div className="note-options-delete__info">
        <h3>Are you sure you want to delete this note?</h3>
        <p>Your note will be deleted permanently.</p>
      </div>
      <button
        className="note-options-delete__button"
        onClick={props.onDelete}
      >
      Yes
      </button>
    </div>
  </FadeAndSlideIn>
);

DeleteOptions.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteOptions;
