import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signInRequest } from '../actions/userActions';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: { value: '', isValid: true },
      password: { value: '', isValid: true },
      passwordConf: { value: '', isValid: true },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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

  checkValidity(value, name, checktLastState = false) {
    const isValid = checktLastState ? true : this.validate(value, name);
    this.setState(state => Object.assign({}, state, {
      [name]: { value, isValid },
    }));

    return isValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('called submit');

    // validate onSubmit
    const areValid = Object.keys(this.state)
      .map(key => this.checkValidity(this.state[key].value, key));
    // stop if some of the inputs has invalid value
    if (areValid.every(input => input === true)) {
      const name = this.state.name.value;
      const password = this.state.password.value;
      // send sign in request and change route on success
      console.log('called request action creator');
      this.props.signInRequest({ name, password }, () => {
        this.props.history.push('/notes');
      });
    }
  }

  handleBlur(event, name) {
    const value = event.target.value;

    // validate onBlur by default
    this.checkValidity(value, name);
  }

  handleChange(event, name) {
    const value = event.target.value;

    // trigger onChange validation after some handler validated to false
    this.checkValidity(value, name, this.state[name].isValid);
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
            Your username must be at least 3 characters long.
          </span>
        </label>
        <label htmlFor="password"> Password
          <input
            aria-required="true"
            aria-invalid={!this.state.name.isValid}
            id="password"
            type="password"
            value={this.state.password.value}
            onChange={event => this.handleChange(event, 'password')}
            onBlur={event => this.handleBlur(event, 'password')}
          />
          <span style={{ display: this.state.password.isValid ? 'none' : 'inherit' }}>
            Your password must be at least 6 characters long.
          </span>
        </label>
        <label htmlFor="passwordConf"> Confirm Password
          <input
            aria-required="true"
            aria-invalid={!this.state.name.isValid}
            id="passwordConf"
            type="password"
            value={this.state.passwordConf.value}
            onChange={event => this.handleChange(event, 'passwordConf')}
            onBlur={event => this.handleBlur(event, 'passwordConf')}
          />
          <span style={{ display: this.state.passwordConf.isValid ? 'none' : 'inherit' }}>
            Password does not match the confirm password
          </span>
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

SignInForm.propTypes = {
  signInRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(null, { signInRequest })(SignInForm);
