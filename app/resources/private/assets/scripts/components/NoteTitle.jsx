import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NoteTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      showEditor: false,
    };

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
    this.setState(state => Object.assign({}, state, { value }));
  }

  saveHandler() {
    const title = this.state.value;
    this.toggleEditor();
    this.props.onSave({ title });
  }

  keyHandler(event) {
    const code = event.keycode;
    if (code === 32 || code === 13) {
      this.toggleEditor();
    }
  }

  render() {
    return (
      <div>
        <h2>
          <span
            role="button"
            tabIndex="0"
            onClick={this.toggleEditor}
            onKeyPress={this.keyHandler}
          >
            {this.state.value}
          </span>
        </h2>
        <textarea
          type="text"
          value={this.state.value}
          onChange={this.changeHandler}
          onBlur={this.saveHandler}
          style={{ display: this.state.showEditor ? 'inherit' : 'none' }}
        />
      </div>
    );
  }
}

NoteTitle.propTypes = {
  value: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default NoteTitle;
