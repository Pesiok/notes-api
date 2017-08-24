import React from 'react';
import Note from '../containers/Note';

const dummyNote = {
  title: 'A Dummy note',
  content: 'Click on the edit tab to write here soomething... Markdown included',
  meta: {
    tags: ['dummy'],
  },
  share: {
    isShared: false,
  },
};

const NewNote = props => (
  <Note note={dummyNote} {...props} />
);

export default NewNote;
