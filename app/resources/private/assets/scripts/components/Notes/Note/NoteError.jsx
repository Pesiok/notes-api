import React from 'react';
import PropTypes from 'prop-types';

import FadeAndSlideIn from '../../Utilis/FadeAndSlideIn';

const NoteError = ({ errors, resetErrors }) => {
  const errorTypes = Object.keys(errors);
  const areThereErrors = errorTypes.some(type => (!!errors[type]));

  const resetErrorsHandler = () => {
    errorTypes.forEach((type) => {
      if (errors[type]) resetErrors[type]();
    });
  };

  const errorMessage = (type) => {
    let msg;
    switch (type) {
      case 'updateError': msg = 'update'; break;
      case 'deleteError': msg = 'delete'; break;
      case 'createError': msg = 'create'; break;
      case 'getError': msg = 'get'; break;
      default : return 'Unknown error';
    }
    return `couldn't ${msg} the note.`;
  };

  const renderErrors = () => (
    errorTypes.map((type) => {
      const error = errors[type];
      if (error) {
        return (
          <p className="note__error-type">
            {`> ${error}: ${errorMessage(type)}`}
          </p>
        );
      }
      return null;
    })
  );

  if (areThereErrors) {
    return (
      <FadeAndSlideIn in>
        <div className="note__error">
          <div className="note__error-content">
            <h3 className="note__error-title">
            Ups, there is something wrong
            </h3>
            {renderErrors()}
          </div>
          <button
            className="note__error-button"
            onClick={resetErrorsHandler}
          >
          Dismiss
          </button>
        </div>
      </FadeAndSlideIn>
    );
  }

  return null;
};

NoteError.defaultProps = {
  errors: {
    updateError: null,
    deleteError: null,
    createError: null,
    getError: null,
  },
};

NoteError.propTypes = {
  errors: PropTypes.shape({
    updateError: PropTypes.string,
    deleteError: PropTypes.string,
    createError: PropTypes.string,
    getError: PropTypes.string,
  }).isRequired,
  resetErrors: PropTypes.shape({
    updateError: PropTypes.func.isRequired,
    deleteError: PropTypes.func.isRequired,
    createError: PropTypes.func.isRequired,
    getError: PropTypes.func.isRequired,
  }).isRequired,
};

export default NoteError;
