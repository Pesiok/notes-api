import React, { Component } from 'react';
import Input from './../components/Input';


export default class SignInForm extends Component {
    constructor() {
        super();
        this.state = { 
            name: '',
            password: '',
            passwordConf: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    handleChange(event, type) {
        const value = event.target.value;
        this.setState(Object.assign({}, this.state, {
             [type]: value 
        }));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Input 
                    name="Name" 
                    type="text" 
                    value={this.state.name}
                    valueSrc ="name" 
                    handler={this.handleChange}
                />
                <Input
                    name="Password"
                    type="password"
                    value={this.state.password}
                    valueSrc="password"
                    handler={this.handleChange}
                />
                <Input 
                    name="Confirm password"
                    type="password"
                    value={this.state.passwordConf}
                    valueSrc="passwordConf"
                    handler={this.handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}