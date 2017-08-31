import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

class LogInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: { value: '', isValid: true },
      pass: { value: '', isValid: true },
      exists: true,
    };

    // bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  setValidity(type, validity) {
    this.setState(state => Object.assign({}, state, {
      [type]: { value: state[type].value, isValid: validity },
    }));
    return validity;
  }

  handleChange(event, type) {
    const value = event.target.value;

    this.setState(state => Object.assign({}, state, {
      [type]: { value, isValid: state[type].isValid },
    }));
  }

  checkIfExists(login) {
    if (login.length <= 0) {
      this.setState(state => Object.assign({}, state, { exists: true }));
    } else {
      fetch(`/api/users/find/${login}`)
        .then((response) => {
          if (response.status === 404) {
            this.setState(state => Object.assign({}, state, { exists: false }));
          } else if (response.status === 200) {
            this.setState(state => Object.assign({}, state, { exists: true }));
          }
        });
    }
  }

  validate(type, value) {
    switch (type) {
      case 'pass': {
        if (value.length <= 0) {
          return this.setValidity(type, false);
        }
        return this.setValidity(type, true);
      }
      case 'login': {
        if (value.length <= 0) {
          this.checkIfExists(value);
          return this.setValidity(type, false);
        }
        this.checkIfExists(value);
        return this.setValidity(type, true);
      }
      default: {
        return false;
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const login = this.state.login.value;
    const pass = this.state.pass.value;
    const areInValid = [
      this.validate('login', this.state.login.value),
      this.validate('pass', this.state.pass.value),
    ];

    // send request if user exists and password is provided
    if (!areInValid.some(input => input === false) && this.state.exists) {
      this.props.logInRequest({ name: login, password: pass })
        .then(() => {
          if (!this.props.error) {
            this.props.history.push('/notes');
          }
        });
    }
  }

  handleBlur(event, type) {
    const value = event.target.value;
    if (value.length > 0) {
      this.validate(type, value);
    }
  }

  render() {
    const inputClass = 'form__group-input form__group-input--primary';
    const nameClass = 'form__group-name form__group-name--primary';

    return (
      <form
        className={`form ${this.props.className}`}
        onSubmit={event => this.handleSubmit(event)}
      >
        {this.props.error &&
          <div className="form__error">
            <h3 className="form__error-title">{`Error: ${this.props.error}`}</h3>
            <p className="form__error-info">Couldn&#39;t log in.</p>
          </div>
        }
        <div className="form__content">
          <h3 className="form__heading form__heading--primary">Log in</h3>
          <Input
            name="login"
            type="text"
            value={this.state.login.value}
            isValid={this.state.login.isValid}
            changeHandler={this.handleChange}
            blurHandler={this.handleBlur}
            errorMessages={[
              { validity: this.state.login.isValid, content: 'Please type in username' },
              { validity: this.state.exists, content: 'This user does not exist' },
            ]}
            cssClass={{ name: nameClass, input: inputClass }}
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
            cssClass={{ name: nameClass, input: inputClass }}
          >
            Password
          </Input>
          <button
            className="form__submit form__submit--primary"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

LogInForm.defaultProps = {
  error: null,
};

LogInForm.defaultProps = {
  className: '',
};

LogInForm.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  logInRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default LogInForm;
