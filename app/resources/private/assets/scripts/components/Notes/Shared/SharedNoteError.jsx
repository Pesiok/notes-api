import React from 'react';
import PropTypes from 'prop-types';

const SharedNoteError = ({ error }) => (
  <div className="shared-note__error">
    <h2 className="shared-note__error-title">
      Oh Snap: {error} :(
    </h2>
    <p className="shared-note__error-info">
      &gt; Note you were trying to access is probably no longer shared.
    </p>
  </div>
);

SharedNoteError.defaultProps = {
  error: null,
};

SharedNoteError.propTypes = {
  error: PropTypes.string,
};

export default SharedNoteError;
