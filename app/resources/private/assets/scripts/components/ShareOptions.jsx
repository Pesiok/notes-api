import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Flatpickr from 'react-flatpickr'; // eslint-disable-line
import DateTimePicker from './DateTimePicker';

class ShareOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShared: this.props.value.isShared,
      expiration: this.props.value.expiration,
    };

    this.calendarInstance = null;

    // 'this' bindings
    this.isSharedHandler = this.isSharedHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.datetimeHandler = this.datetimeHandler.bind(this);
  }

  isSharedHandler(event) {
    const isShared = event.target.checked;
    let expiration = this.state.expiration;
    if (!isShared) expiration = null;

    this.setState(state => Object.assign({}, state, { isShared, expiration }));
  }

  datetimeHandler(dates) {
    const expiration = Date.parse(dates[0]) || null;
    const isShared = this.state.isShared;

    this.setState(state => Object.assign({}, state, { isShared, expiration }));
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.onSave({
      share: {
        isShared: this.state.isShared,
        expiration: this.state.expiration,
      },
    });
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <label htmlFor="isShared"> Shared
          <input
            id="isShared"
            type="checkbox"
            checked={this.state.isShared}
            onChange={this.isSharedHandler}
          />
        </label>
        {
          this.state.isShared &&
          <div>
            <em><a href={this.props.url}>{this.props.url}</a></em>
            <DateTimePicker
              onChange={this.datetimeHandler}
              value={this.state.expiration}
            />
          </div>
        }
        <button type="submit">Save</button>
      </form>
    );
  }
}

ShareOptions.propTypes = {
  value: PropTypes.shape({
    isShared: PropTypes.bool.isRequired,
    expiration: PropTypes.string,
  }).isRequired,
  url: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ShareOptions;
