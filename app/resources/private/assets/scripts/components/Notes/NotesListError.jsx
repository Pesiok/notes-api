import React from 'react';
import PropTypes from 'prop-types';

const NotesListError = ({ error, resetGetNotesError }) => {
  if (error && error !== 'Not Found') {
    return (
      <div className="notes-list__error">
        <div>
          <strong className="notes-list__error-title">
            Oh snap, there is an error
          </strong>
          <p className="notes-list__error-info">
            {`> ${error}: couldn't get your notes from the server`}
          </p>
        </div>
        <button
          className="notes-list__error-button"
          onClick={() => resetGetNotesError()}
        >
          <span className="visually-hidden">dismiss</span>
          <span className="material-icons">close</span>
        </button>
      </div>
    );
  }

  return null;
};

NotesListError.defaultProps = {
  error: null,
};

NotesListError.propTypes = {
  error: PropTypes.string,
  resetGetNotesError: PropTypes.func.isRequired,
};

export default NotesListError;
