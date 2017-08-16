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
      <label htmlFor="expiration">Set optional expiration
        <input 
          id="expiration"
          className="flatpickr" 
          ref={input => this.inputField = input}
          readOnly
        />
        <button 
          type="button"
          onClick={this.resetHandler}
        >
          Reset
        </button> 
      </label>
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
