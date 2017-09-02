import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClickedOutside extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.clickHandler);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.clickHandler);
  }

  clickHandler(event) {
    if (this.node && !this.node.contains(event.target)) {
      this.props.on();
    }
  }

  render() {
    return (
      <div ref={(node) => { this.node = node; }}>
        {this.props.children}
      </div>
    );
  }
}

ClickedOutside.defaultProps = {
  on: () => console.log('clicked outside!'), // eslint-disable-line
};

ClickedOutside.propTypes = {
  children: PropTypes.element.isRequired,
  on: PropTypes.func,
};

export default ClickedOutside;
