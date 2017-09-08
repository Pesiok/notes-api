import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isValid: true,
      tags: this.props.tags,
    };

    // bindings
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillReceiveProps({ tags }) {
    this.setState(state => Object.assign({}, state, { tags }));
  }

  validate(value, callback) {
    let isValid = true;

    // check if tag already exists in state or is empty
    if (this.state.tags.find(tag => tag === value) || value.length === 0) {
      isValid = false;
    }
    this.setState(state => Object.assign({}, state, { isValid }), callback);
  }

  changeHandler(event) {
    const value = event.target.value;
    this.validate(value);
    this.setState(state => Object.assign({}, state, { value }));
  }

  submitHandler(event) {
    const sendRequest = () => {
      if (this.state.isValid) {
        const tags = [...this.state.tags, this.state.value];
        this.props.onSave(tags);
      }
    };
    event.preventDefault();

    // check if state is valid and send request after validation
    this.validate(this.state.value, sendRequest);
  }

  render() {
    return (
      <form
        className="note-options-tags__add"
        onSubmit={this.submitHandler}
      >
        <div className="note-options-tags__add-input-group">
          <label htmlFor="addTag" className="visually-hidden">Add tag</label>
          <input
            className="note-options-tags__add-input"
            aria-required="true"
            aria-invalid={!this.state.isValid}
            id="addTag"
            type="text"
            value={this.state.value}
            onChange={this.changeHandler}
          />
          <button
            type="submit"
            className="note-options-tags__add-button"
          >
            Add
          </button>
        </div>
        <span
          className="note-options-tags__add-error"
          style={{ display: this.state.isValid ? 'none' : 'inherit' }}
        >
        Incorrect tag
        </span>
      </form>
    );
  }
}

AddTag.propTypes = {
  onSave: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddTag;
