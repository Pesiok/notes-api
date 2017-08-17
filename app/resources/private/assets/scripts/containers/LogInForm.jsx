import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logInRequest } from '../actions/user/logInActions';

class LogInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: { value: '', isValid: true },
      password: { value: '', isValid: true },
    };
  }

  setValidity(type, validity) {
    this.setState(state => Object.assign({}, state, {
      [type]: { value: this.state[type].value, isValid: validity },
    }));
  }

  handleChange(event, name) {
    const value = event.target.value;

    this.setState(state => Object.assign({}, state, {
      [name]: { value, isValid: this.state[name].isValid },
    }));
  }

  checkIfExists(name) {
    fetch(`/api/users/find/${name}`)
      .then((response) => {
        if (response.status === 404) {
          this.setValidity('name', false);
        } else if (response.status === 200) {
          this.setValidity('name', true);
        }
      });
  }

  validate(type, value) {
    switch (type) {
      case 'password': {
        if (value.length <= 0) {
          this.setValidity(type, false);
        } else {
          this.setValidity(type, true);
        }
        break;
      }
      case 'name': {
        this.checkIfExists(value);
        break;
      }
      default: break;
    }
  }

  handleSubmit(event) {
    const name = this.state.name.value;
    const password = this.state.password.value;
    const areInValid = Object.keys(this.state)
      .map(key => this.validate(this.state[key].value, key));

    event.preventDefault();

    // send request if user exists and password is provided
    if (!areInValid.some(input => input === false)) {
      this.props.logInRequest({ name, password })
        .then(() => this.props.history.push('/notes'));
    }
  }

  handleBlur(event, type) {
    const value = event.target.value;

    this.validate(type, value);
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <label htmlFor="name"> Username
          <input
            aria-required="true"
            aria-invalid={!this.state.name.isValid}
            id="name"
            type="text"
            value={this.state.name.value}
            onChange={event => this.handleChange(event, 'name')}
            onBlur={event => this.handleBlur(event, 'name')}
          />
          <span style={{ display: this.state.name.isValid ? 'none' : 'inherit' }}>
            This user does not exist
          </span>
        </label>
        <label htmlFor="password"> Password
          <input
            aria-required="true"
            id="password"
            type="password"
            aria-invalid={!this.state.password.isValid}
            value={this.state.password.value}
            onChange={event => this.handleChange(event, 'password')}
            onBlur={event => this.handleBlur(event, 'password')}
          />
          <span style={{ display: this.state.password.isValid ? 'none' : 'inherit' }}>
            Please type in password
          </span>
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

LogInForm.propTypes = {
  logInRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(null, { logInRequest })(LogInForm);
