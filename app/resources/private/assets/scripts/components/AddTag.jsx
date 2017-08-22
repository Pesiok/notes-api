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

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillReceiveProps({ tags }) {
    this.setState(state => Object.assign({}, state, { tags }));
  }

  validate() {
    const value = this.state.value;
    let isValid = true;
    // check if tag already exists in state or is empty
    if (this.state.tags.find(tag => tag === value) || value.length === 0) isValid = false;
    this.setState(state => Object.assign({}, state, { isValid }));
  }

  changeHandler(event) {
    const value = event.target.value;
    if (!this.state.isValid) this.validate();
    this.setState(state => Object.assign({}, state, { value }));
  }

  submitHandler(event) {
    event.preventDefault();
    this.validate();

    if (this.state.isValid) {
      const tags = [...this.state.tags, this.state.value];
      this.props.onSave(tags);
    }
  }

  render() {
    return (
      <form
        className="note-options-tags__add"
        onSubmit={this.submitHandler}
      >
        <label htmlFor="addTag">
          <input
            className="note-options-tags__add-input"
            aria-required="true"
            aria-invalid={!this.state.isValid}
            id="addTag"
            type="text"
            value={this.state.value}
            onChange={this.changeHandler}
            onBlur={this.validate}
          />
        </label>
        <span
          className="note-options-tags__add-error"
          style={{ display: this.state.isValid ? 'none' : 'inherit' }}
        >
          Incorrect tag
        </span>
        <button
          className="note-options-tags__add-button"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

AddTag.propTypes = {
  onSave: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddTag;
