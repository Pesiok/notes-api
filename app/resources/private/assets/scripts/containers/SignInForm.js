import React, { Component } from 'react';

export default class SignInForm extends Component {
    constructor() {
        super();
        this.state = { 
            name: { value: '', isValid: true },
            password: { value: '', isValid: true },
            passwordConf: { value: '', isValid: true }
        };
    }

    _validate(value, name) {
        let validity = this.state[name].isValid;
        switch(name) {
            case 'name': {
                validity = (value.length < 3 || value.length === 0) ? false : true;
                break;
            }
            case 'password': {
                validity =  (value.length < 6 || value.length === 0) ? false : true;
                break;
            }
            case 'passwordConf': {
                validity = (value !== this.state.password.value) ? false : true;
                break;
            }
            default: break;
        }
        return validity;
    }
    
    checkValidity(value, name, checktLastState = false) {
        const isValid = checktLastState ? true : this._validate(value, name);
        this.setState(state => {
            return Object.assign({}, state, {
                [name]: { value, isValid }
            })
        });

        return isValid;
    }

    handleSubmit(event) {
        event.preventDefault();

        // validate onSubmit
        const areValid = Object.keys(this.state).map(key => {
            return this.checkValidity(this.state[key].value, key);
        });
        // stop if some of the inputs has invalid value
        if(areValid.some(input => input === true)) return false;

        // otherwise send request
        // some redux saga mombo-jumbo

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
                <label> Username
                    <input 
                        type="text"
                        value={this.state.name.value}
                        onChange={event => this.handleChange(event, 'name')}
                        onBlur={event => this.handleBlur(event, 'name')}
                    />
                    <span style={ { display: this.state.name.isValid ? 'none' : 'inherit' } }>
                        Your username must be at least 3 characters long.
                    </span>
                </label>
                <label> Password
                    <input 
                        type="password"
                        value={this.state.password.value}
                        onChange={event => this.handleChange(event, 'password')}
                        onBlur={event => this.handleBlur(event, 'password')}
                    />
                     <span style={ { display: this.state.password.isValid ? 'none' : 'inherit' } }>
                        Your password must be at least 6 characters long.
                    </span>
                </label>
                <label> Confirm Password
                    <input 
                        type="password"
                        value={this.state.passwordConf.value}
                        onChange={event => this.handleChange(event, 'passwordConf')}
                        onBlur={event => this.handleBlur(event, 'passwordConf')}
                    />
                     <span style={ { display: this.state.passwordConf.isValid ? 'none' : 'inherit' } }>
                        Password does not match the confirm password
                    </span>
                </label>
                <button type="submit">Submit</button>
            </form>
        );
    }
}