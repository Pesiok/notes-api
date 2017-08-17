import React from 'react';
import PropTypes from 'prop-types';

const DeleteOptions = props => (
  <div>
    <strong>Are you sure you want to delete this note?</strong>
    <button onClick={props.onDelete}>Yes</button>
  </div>
);

DeleteOptions.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteOptions;
