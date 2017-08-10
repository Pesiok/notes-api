import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

export default class MarkdownPreviewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      markup: '',
    };

    this.changeHandler = this.changeHandler.bind(this);
  }

  componentWillMount() {
    this.transpile();
  }

  changeHandler(event) {
    const value = event.target.value;
    this.setState(state => Object.assign({}, state, { value }));
    this.transpile();
  }

  transpile() {
    const transpiled = marked(this.state.value, { sanitize: true });
    this.setState(state => Object.assign({}, state, { markup: { __html: transpiled } }));
  }

  render() {
    return (
      <div>
        <span dangerouslySetInnerHTML={this.state.markup} />
        <textarea
          type="text"
          value={this.state.value}
          onChange={this.changeHandler}
        />
        <button>Save</button>
      </div>
    );
  }
}

MarkdownPreviewer.propTypes = {
  value: PropTypes.string.isRequired,

};
