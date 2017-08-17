import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddTag from './AddTag';

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
        <li key={`tag-${tag}`}>
          <span>{tag}</span>
          <button
            onClick={() => this.removeTag(index)}
            title="Remove tag"
          >
            x
          </button>
        </li>
      ))
    );
  }

  render() {
    return (
      <div>
        {this.props.value.tags.length > 0 &&
        <ul>
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
