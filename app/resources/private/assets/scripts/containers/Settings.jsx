import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logOutRequest } from '../actions/user/logOutActions';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.logOutHandler = this.logOutHandler.bind(this);
  }

  logOutHandler() {
    this.props.logOutRequest()
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <section className="content settings">
        <div className="settings__content">
          <div className="settings__content-items">
            <h2 className="settings__heading">Settings</h2>
            <ul className="settings__list">
              <li className="settings__list-item">
                <button
                  onClick={this.logOutHandler}
                  className="settings__list-item-button"
                >
                  <span
                    aria-hidden="true"
                    className="settings__list-item-icon material-icons"
                  >
                    exit_to_app
                  </span>
                  <span>Log out from this device</span>
                </button>
              </li>
              <li className="settings__list-item">
                <button
                  disabled
                  className="settings__list-item-button"
                >
                  <span
                    aria-hidden="true"
                    className="settings__list-item-icon material-icons"
                  >
                  exit_to_app
                  </span>
                  <span>Log out from all devices</span>
                </button>
              </li>
            </ul>
            <span style={{ fontSize: '1.5rem' }}>
              There is no many settings for now...
            </span>
            <div className="settings__details">
              <h2 className="settings__details-heading">Account details</h2>
              <dl className="settings__details-list">
                <dt>User:</dt>
                <dd>{this.props.user.name}</dd>
                <dt>ID:</dt>
                <dd>{this.props.user._id}</dd>
                <dt>Number of notes</dt>
                <dd>{this.props.notesNumber}</dd>
                <dt>Currently used token:</dt>
                <dd>{this.props.token}</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Settings.defaultProps = {
  notesNumber: 0,
  user: {
    name: null,
    _id: null,
  },
  token: null,
};

Settings.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  logOutRequest: PropTypes.func.isRequired,
  notesNumber: PropTypes.number,
  user: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
  token: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token,
    notesNumber: Object.keys(state.notesReducer).length,
  };
}

export default connect(mapStateToProps, {
  logOutRequest,
})(Settings);
