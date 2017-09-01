import React from 'react';
import PropTypes from 'prop-types';

const DeleteOptions = props => (
  <div className="note-options-delete">
    <div className="note-options-delete__content">
      <strong>Are you sure you want to delete this note?</strong>
      <button
        className="note-options-delete__button"
        onClick={props.onDelete}
      >
        Yes
      </button>
    </div>
  </div>
);

DeleteOptions.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteOptions;