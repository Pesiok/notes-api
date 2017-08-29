import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signInRequest } from '../actions/user/signInActions';

import Input from '../components/Input';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: { value: '', isValid: true },
      password: { value: '', isValid: true },
      passwordConf: { value: '', isValid: true },
      isAvailable: true,
    };

    // bindings
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validate(value, name) {
    let validity = this.state[name].isValid;
    switch (name) {
      case 'name': {
        validity = !((value.length < 3 || value.length === 0));
        break;
      }
      case 'password': {
        validity = !((value.length < 6 || value.length === 0));
        break;
      }
      case 'passwordConf': {
        validity = value === this.state.password.value;
        break;
      }
      default: break;
    }
    return validity;
  }

  checkAvailability(name) {
    // check name availability
    if (name.length > 0) {
      fetch(`/api/users/find/${name}`)
        .then((response) => {
          if (response.status === 404) {
            this.setState(state => Object.assign({}, state, { isAvailable: true }));
          } else if (response.status === 200) {
            this.setState(state => Object.assign({}, state, { isAvailable: false }));
          }
        });
    }
  }

  checkValidity(value, name, checktLastState = false) {
    const isValid = checktLastState ? true : this.validate(value, name);
    this.setState(state => Object.assign({}, state, {
      [name]: { value, isValid },
    }));

    return isValid;
  }

  handleSubmit(event) {
    event.preventDefault();

    // validate onSubmit
    const areInValid = Object.keys(this.state)
      .map(key => this.checkValidity(this.state[key].value, key));
    this.checkAvailability(this.state.name.value);

    // stop if some of the inputs has invalid value or name is not available
    if (!areInValid.some(input => input === false) && this.state.isAvailable) {
      const name = this.state.name.value;
      const password = this.state.password.value;

      // send sign in request and change route on success
      this.props.signInRequest({ name, password })
        .then(() => this.props.history.push('/notes'));
    }
  }

  handleBlur(event, name) {
    const value = event.target.value;

    if (value.length > 0) {
      if (name === 'name') this.checkAvailability(event.target.value);

      // validate onBlur by default
      this.checkValidity(value, name);
    }
  }

  handleChange(event, name) {
    const value = event.target.value;

    // trigger onChange validation after
    // some handler already validated to false
    this.checkValidity(value, name, this.state[name].isValid);
  }

  render() {
    const inputClass = 'form__group-input form__group-input--secondary';
    const nameClass = 'form__group-name form__group-name--secondary';

    return (
      <form
        className="form"
        onSubmit={event => this.handleSubmit(event)}
      >
        <h3 className="form__heading form__heading--secondary">Sign in</h3>
        <Input
          name="name"
          type="text"
          value={this.state.name.value}
          isValid={this.state.name.isValid}
          changeHandler={this.handleChange}
          blurHandler={this.handleBlur}
          errorMessages={[
            {
              validity: this.state.name.isValid,
              content: 'Your username must be at least 3 characters long.',
            },
            {
              validity: this.state.isAvailable,
              content: 'This name is not available.',
            },
          ]}
          class={{ name: nameClass, input: inputClass }}
        >
          Username
        </Input>
        <Input
          name="password"
          type="password"
          value={this.state.password.value}
          isValid={this.state.password.isValid}
          changeHandler={this.handleChange}
          blurHandler={this.handleBlur}
          errorMessages={[
            {
              validity: this.state.password.isValid,
              content: 'Your password must be at least 6 characters long.',
            },
          ]}
          class={{ name: nameClass, input: inputClass }}
        >
          Password
        </Input>
        <Input
          name="passwordConf"
          type="password"
          value={this.state.passwordConf.value}
          isValid={this.state.passwordConf.isValid}
          changeHandler={this.handleChange}
          blurHandler={this.handleBlur}
          errorMessages={[
            {
              validity: this.state.passwordConf.isValid,
              content: 'Passwords do not match',
            },
          ]}
          class={{ name: nameClass, input: inputClass }}
        >
          Confirm password
        </Input>
        <button
          className="form__submit form__submit--secondary"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

SignInForm.propTypes = {
  signInRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(null, { signInRequest })(SignInForm);
