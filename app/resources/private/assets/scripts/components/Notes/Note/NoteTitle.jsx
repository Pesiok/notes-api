import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ClickedOutside from '../../Utilis/ClickedOutside';

class NoteTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditor: false,
    };

    this.initialValue = this.props.value;

    // bindings 
    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
  }

  toggleEditor() {
    this.setState(state => Object.assign({}, state, { showEditor: !this.state.showEditor }));
  }

  changeHandler(event) {
    const value = event.target.value;

    this.props.onChange(value, 'title');
  }

  saveHandler() {
    const { value, onChange, onSave } = this.props;
    this.toggleEditor();

    if (value === this.initialValue) {
      // do nothing
    } else if (value.length === 0) {
      // bring back initial value
      onChange(this.initialValue, 'title');
    } else {
      // send update request
      onSave();
    }
  }

  keyHandler(event) {
    const code = event.which;
    if (code === 32 || code === 13) {
      // open on enter or space
      this.toggleEditor();
    }
  }

  render() {
    return (
      <div className="note-title">
        <h2 className="note-title__heading">
          {!this.state.showEditor &&
            <span
              className="note-title__button"
              title="Click to change title"
              role="button"
              tabIndex="0"
              onClick={this.toggleEditor}
              onKeyPress={this.keyHandler}
            >
              {this.props.value}
            </span>
          }
        </h2>
        {this.state.showEditor &&
          <ClickedOutside on={this.saveHandler}>
            <input
              className="note-title__editor"
              type="text"
              value={this.props.value}
              onChange={this.changeHandler}
              onBlur={this.saveHandler}
            />
          </ClickedOutside>
        }
      </div>
    );
  }
}

NoteTitle.propTypes = {
  value: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NoteTitle;
