import React from 'react';
import PropTypes from 'prop-types';

const formatDateTime = timestamp => new Date(timestamp).toLocaleString();

const SharedNoteDetails = ({ note }) => (
  <div className="shared-note-details">
    <dl className="shared-note-details__list">
      <dt className="shared-note-details__list-title">
        Created:
      </dt>
      <dd className="shared-note-details__list-def">
        <time>{formatDateTime(note.meta.created)}</time>
      </dd>
      <dt className="shared-note-details__list-title">
        Edited:
      </dt>
      <dd className="shared-note-details__list-def">
        {note.meta.edited ?
          <time>{formatDateTime(note.meta.edited)}</time>
          :
          'no'
        }
      </dd>
      <dt className="shared-note-details__list-title">
        Expires:
      </dt>
      <dd className="shared-note-details__list-def">
        {note.share.expiration ?
          <time>on {formatDateTime(note.share.expiration)}</time>
          :
          'no'
        }
      </dd>
    </dl>
  </div>
);

SharedNoteDetails.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      edited: PropTypes.string,
      created: PropTypes.string.isRequired,
    }),
    share: PropTypes.shape({
      isShared: PropTypes.bool.isRequired,
    }),
  }).isRequired,
};

export default SharedNoteDetails;
