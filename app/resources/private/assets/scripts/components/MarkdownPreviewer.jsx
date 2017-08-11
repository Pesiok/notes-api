import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

const transpile = (value) => {
  const transpiled = marked(value, { sanitize: true });
  return { __html: transpiled };
};

class MarkdownPreviewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  saveHandler() {
    const content = this.state.value;
    console.log(content);
    this.props.onSave({ content });
  }

  changeHandler(event) {
    const value = event.target.value;
    this.setState(state => Object.assign({}, state, { value }));
  }

  render() {
    return (
      <div>
        <span dangerouslySetInnerHTML={transpile(this.state.value)} />
        <textarea
          type="text"
          value={this.state.value}
          onChange={this.changeHandler}
        />
        <button onClick={this.saveHandler}>Save</button>
      </div>
    );
  }
}

MarkdownPreviewer.propTypes = {
  value: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MarkdownPreviewer;
