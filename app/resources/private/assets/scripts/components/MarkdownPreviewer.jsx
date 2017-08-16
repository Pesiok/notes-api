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
    this.props.onSave({ content });
  }

  changeHandler(event) {
    const value = event.target.value;
    this.setState(state => Object.assign({}, state, { value }));
  }

  render() {
    /*eslint-disable */
    return (
      <div> 
        <span dangerouslySetInnerHTML={transpile(this.state.value)} /> 
        <div style={{ display: this.props.showEditor ? 'inherit' : 'none' }}>
          <textarea
            type="text"
            value={this.state.value}
            onChange={this.changeHandler}
          />
          <button onClick={this.saveHandler}>Save</button>
        </div>
      </div>
    );
  /*eslint-enable */
  }
}

MarkdownPreviewer.propTypes = {
  value: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  showEditor: PropTypes.bool.isRequired,
};

export default MarkdownPreviewer;
