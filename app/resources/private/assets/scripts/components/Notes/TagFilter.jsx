import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TagFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState(state => Object.assign({}, state, { value }));
  }

  handleSubmit(event) {
    const value = this.state.value;
    event.preventDefault();
    this.props.onSave(value);
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="note-tag-filter"
      >
        <div className="note-tag-filter__content">
          <h2 className="note-tag-filter__heading">Active tag filter:</h2>
          <label
            htmlFor="tagFilterInput"
            className="visually-hidden"
          >
            Your tag filter
          </label>
          <div className="note-tag-filter__input-group">
            <input
              id="tagFilterInput"
              type="text"
              className="note-tag-filter__input"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="none"
            />
            <button
              title="filter by tag"
              type="submit"
              className="note-tag-filter__button"
            >
              <span
                className="note-tag-filter__button-icon material-icons"
              >
                filter_list
              </span>
              <span
                className="visually-hidden"
              >
                filter
              </span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

TagFilter.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default TagFilter;
