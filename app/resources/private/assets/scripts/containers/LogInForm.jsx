import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logInRequest } from '../actions/user/logInActions';

import Input from '../components/Input';

class LogInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: { value: '', isValid: true },
      pass: { value: '', isValid: true },
    };

    // bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  setValidity(type, validity) {
    this.setState(state => Object.assign({}, state, {
      [type]: { value: this.state[type].value, isValid: validity },
    }));
  }

  handleChange(event, login) {
    const value = event.target.value;

    this.setState(state => Object.assign({}, state, {
      [login]: { value, isValid: this.state[login].isValid },
    }));
  }

  checkIfExists(login) {
    fetch(`/api/users/find/${login}`)
      .then((response) => {
        if (response.status === 404) {
          this.setValidity('login', false);
        } else if (response.status === 200) {
          this.setValidity('login', true);
        }
      });
  }

  validate(type, value) {
    switch (type) {
      case 'pass': {
        if (value.length <= 0) {
          this.setValidity(type, false);
        } else {
          this.setValidity(type, true);
        }
        break;
      }
      case 'login': {
        this.checkIfExists(value);
        break;
      }
      default: break;
    }
  }

  handleSubmit(event) {
    const login = this.state.login.value;
    const pass = this.state.pass.value;
    const areInValid = Object.keys(this.state)
      .map(key => this.validate(this.state[key].value, key));

    event.preventDefault();

    // send request if user exists and password is provided
    if (!areInValid.some(input => input === false)) {
      this.props.logInRequest({ name: login, password: pass })
        .then(() => this.props.history.push('/notes'));
    }
  }

  handleBlur(event, type) {
    const value = event.target.value;
    this.validate(type, value);
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={event => this.handleSubmit(event)}
      >
        <h3 className="form__heading">Log in</h3>
        <Input
          name="login"
          type="text"
          value={this.state.login.value}
          isValid={this.state.login.isValid}
          changeHandler={this.handleChange}
          blurHandler={this.handleBlur}
          errorMessages={[
            { validity: this.state.login.isValid, content: 'This user does not exist' },
          ]}
        >
          Username
        </Input>
        <Input
          name="pass"
          type="password"
          value={this.state.pass.value}
          isValid={this.state.pass.isValid}
          changeHandler={this.handleChange}
          blurHandler={this.handleBlur}
          errorMessages={[
            { validity: this.state.pass.isValid, content: 'Please type in password' },
          ]}
        >
          Password
        </Input>
        <button
          className="form__submit"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

LogInForm.propTypes = {
  logInRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(null, { logInRequest })(LogInForm);
