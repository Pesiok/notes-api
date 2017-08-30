import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'flatpickr';

class DateTimePicker extends Component {
  constructor(props) {
    super(props);

    this.resetHandler = this.resetHandler.bind(this);
  }

  componentDidMount() {
    this.flatpickr = new Flatpickr(this.inputField, {
      onChange: this.props.onChange,
      enableTime: true,
      time_24hr: true,
    });

    this.flatpickr.setDate(this.props.value, false);
  }

  componentWillReceiveProps(props) {
    if (props.value) {
      this.flatpickr.setDate(props.value, false);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  resetHandler() {
    this.flatpickr.clear();
  }

  render() {
    /*eslint-disable */
    return (
        <div className="note-options-share__expiration">
          <label 
            htmlFor="expiration"
            className="note-options-share__expiration-label"
          >
          Set optional expiration:
          </label>
          <div className="note-options-share__expiration-input">
            <input 
              id="expiration" 
              ref={input => this.inputField = input}
              readOnly
            />
            <button
              title="clear input"
              className="material-icons"
              type="button"
              onClick={this.resetHandler}
            >
              clear
            </button>
          </div> 
        </div>
    );
    /*eslint-enable */
  }
}

DateTimePicker.defaultProps = {
  value: null,
};

DateTimePicker.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
};

export default DateTimePicker;
