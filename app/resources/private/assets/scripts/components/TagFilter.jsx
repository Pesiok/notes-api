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

  filterNotes(notes) {
    return notes.filter((note) => {
      const mached = note.meta.tags.map(tag => tag === this.state.value);
      const atLeastOneMatches = mached.some(value => value === true);
      console.log(atLeastOneMatches);
      return atLeastOneMatches;
    });
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState(state => Object.assign({}, state, { value }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const filtredNotes = this.filterNotes(this.props.notes);
    this.props.onSave(filtredNotes);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>With tag:</h2>
        <label htmlFor="tagFilterInput">Show notes only with given tag</label>
        <input
          id="tagFilterInput"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="submit">Filter</button>
      </form>
    );
  }
}

TagFilter.propTypes = {
  onSave: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.obj).isRequired,
};

export default TagFilter;
