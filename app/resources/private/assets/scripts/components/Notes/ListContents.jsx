import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NotePreview from './NotePreview';

const onEnterAnimation = (items) => {
  items.forEach((item, index) => {
    item.classList.add('note-preview--active');
    const timeout = 0 + (index * 66.66);
    window.setTimeout(() => item.classList.add('note-preview--show'), timeout);
  });
};

class ListContents extends Component {
  constructor(props) {
    super(props);

    // bindings
    this.getList = this.getList.bind(this);
  }

  componentDidMount() {
    if (this.list) {
      onEnterAnimation([...this.list.querySelectorAll('.note-preview')]);
    }
  }

  componentDidUpdate() {
    if (this.list) {
      onEnterAnimation([...this.list.querySelectorAll('.note-preview')]);
    }
  }

  getList(element) {
    if (element) this.list = element;
  }

  render() {
    const { notesToRender, error, isFetching, placeHolder } = this.props;
    if (notesToRender && notesToRender.length > 0) {
      return (
        <ul className="notes-list__list" ref={this.getList}>
          {
            notesToRender.map(note => (
              <NotePreview
                note={note}
                key={note._id}
              />
            ))
          }
        </ul>
      );
    }
    if (error && error !== 'Not Found' && !isFetching) {
      return (
        <p className="notes-list__placeholder">
          <strong className="notes-list__placeholder-title">{error}</strong>
          We were unable to obtain your notes. Please try again later.
        </p>
      );
    }
    return (
      <p className="notes-list__placeholder">
        {placeHolder}
      </p>
    );
  }
}

ListContents.defaultProps = {
  notesToRender: null,
  error: null,
  isFetching: null,
};

ListContents.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  placeHolder: PropTypes.string.isRequired,
  notesToRender: PropTypes.arrayOf(PropTypes.object),
};

export default ListContents;
