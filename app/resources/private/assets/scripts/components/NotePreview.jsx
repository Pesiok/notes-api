import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const formatDateTime = timestamp => new Date(timestamp).toLocaleString();
const formatTitle = (title) => {
  const maxLength = 19;
  if (title.length > maxLength) {
    return `${title.substring(0, maxLength)}...`;
  }
  return title;
};

const NotePreview = props => (
  <Link to={`/notes/${props.note._id}`} className="note-preview" >
    <li className="note-preview__content">
      <h3 className="note-preview__heading">{formatTitle(props.note.title)}</h3>
      {props.note.share.isShared &&
        <strong className="note-preview__status">Shared</strong>
      }
      {props.note.meta.edited ?
        <time className="note-preview__time">Last edited: {formatDateTime(props.note.meta.edited)}</time> :
        <time className="note-preview__time">Created: {formatDateTime(props.note.meta.created)}</time>
      }
    </li>
  </Link>
);

NotePreview.propTypes = {
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

export default NotePreview;

