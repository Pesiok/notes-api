import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddTag from './AddTag';
// import Transition from '../../Utilis/Transition';

class TagsOptions extends Component {
  constructor(props) {
    super(props);

    this.removeTag = this.removeTag.bind(this);
    this.addTag = this.addTag.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value.tags !== this.props.value.tags) {
      this.props.onSave();
    }
  }

  removeTag(index) {
    const tags = this.props.value.tags.filter((_, i) => i !== index);
    this.props.onChange({ tags }, 'meta');
  }

  addTag(tags) {
    this.props.onChange({ tags }, 'meta');
  }

  renderTags() {
    return (
      this.props.value.tags.map((tag, index) => (
        <li className="note-options-tags__tag" key={`tag-${tag}`}>
          <span className="note-options-tags__tag-name">{tag}</span>
          <button
            className="note-options-tags__tag-button"
            onClick={() => this.removeTag(index)}
            title="Remove tag"
          >
            <span aria-hidden="true" className="material-icons">close</span>
            <span className="visually-hidden">Remove</span>
          </button>
        </li>
      ))
    );
  }

  render() {
    return (
      <div className="note-options-tags">
        {this.props.value.tags.length > 0 &&
        <ul className="note-options-tags__list">
          {this.renderTags()}
        </ul>
        }
        <AddTag
          tags={this.props.value.tags}
          onSave={this.addTag}
        />
      </div>
    );
  }
}

TagsOptions.propTypes = {
  value: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TagsOptions;
