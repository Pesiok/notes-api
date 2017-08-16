import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TagsOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
      tags: this.props.value,
      value: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.addTag = this.addTag.bind(this);
    this.validate = this.validate.bind(this);
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
      this.props.onSave({ meta: { tags: this.state.tags } });
    }
  }

  validate() {
    const value = this.state.value;
    let isValid = true;
    // check if tag already exists in state
    if (this.state.tags.find(tag => tag === value)) isValid = false;
    this.setState(state => Object.assign({}, state, { isValid }));
  }

  addTag() {
    const tag = this.state.value;
    if (this.state.isValid) {
      this.setState(state => Object.assign({}, state, { tags: [...state.tags, tag] }));
    }
  }

  removeTag(index) {
    this.setState(state => Object.assign({}, state, { tags: state.tags.filter((_, i) => i !== index) }));
  }

  renderTags() {
    return this.state.tags.map((tag, index) => (
      <li key={`tag-${tag}`}>
        <span>{tag}</span>
        <button
          onClick={() => this.removeTag(index)}
          title="Remove tag"
        >
          x
        </button>
      </li>
    ));
  }

  render() {
    return (
      <div>
        {this.state.tags.length > 0 &&
          <ul>
            {this.renderTags()}
          </ul>
        }
        <form onSubmit={this.submitHandler}>
          <label htmlFor="addTag">
            <input
              aria-required="true"
              aria-invalid={!this.state.isValid}
              id="addTag"
              type="text"
              value={this.state.value}
              onChange={this.changeHandler}
              onBlur={this.validate}
            />
          </label>
          <span style={{ display: this.state.isValid ? 'none' : 'inherit' }}>
            There is such tag already
          </span>
          <button
            type="button"
            onClick={this.addTag}
          >
          Add
          </button>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

TagsOptions.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TagsOptions;
