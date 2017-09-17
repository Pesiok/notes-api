import React from 'react';
import Note from '../../containers/Notes/Note';

const dummyNote = {
  title: 'A Dummy note',
  // eslint-disable-next-line
  content: 'Click on the edit tab to start writing\r\n\r\nFor example, some code:\r\n\r\n```js\r\nconst adder = x => y => x + y;\r\nconst sum = adder(2)(2);\r\n```\r\n\r\n ## Learn more about Markdown from this tutorial:\r\n---\r\n[![Markdown tutorial](https:\/\/img.youtube.com\/vi\/0_tO8HgJiLQ\/0.jpg)](https:\/\/www.youtube.com\/watch?v=0_tO8HgJiLQ \"Markdown tutorial\")\r\n\r\n---',
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
