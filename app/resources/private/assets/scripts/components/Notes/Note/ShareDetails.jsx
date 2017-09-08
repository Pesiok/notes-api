import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from './DateTimePicker';

const onEnterAnimation = (element) => {
  element.classList.add('note-options-share__content--active');
  window.requestAnimationFrame(() => element.classList.add('note-options-share__content--show'));
};

class ShareDetails extends Component {
  constructor(props) {
    super(props);

    // bindings
    this.getElement = this.getElement.bind(this);
    this.datetimeHandler = this.datetimeHandler.bind(this);
  }

  componentDidMount() {
    if (this.element) onEnterAnimation(this.element);
  }

  getElement(element) {
    this.element = element;
  }

  datetimeHandler(dates) {
    const expiration = Date.parse(dates[0]) || null;
    const isShared = this.props.value.isShared;

    this.props.onChange({ isShared, expiration }, 'share');
  }

  render() {
    const { url, value } = this.props;
    return (
      <div className="note-options-share__content" ref={this.getElement} >
        <em className="note-options-share__link">Sharable link:
          <a href={url}>{url}</a>
        </em>
        <DateTimePicker
          onChange={this.datetimeHandler}
          value={value.expiration}
        />
      </div>
    );
  }
}
ShareDetails.propTypes = {
  value: PropTypes.shape({
    isShared: PropTypes.bool.isRequired,
    expiration: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  url: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ShareDetails;
