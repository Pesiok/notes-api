import React from 'react';
import PropTypes from 'prop-types';


const Input = props => (
  <label
    className="form__group"
    htmlFor={props.name}
  >
    {props.children}
    <input
      className="form__group-input"
      aria-required="true"
      aria-invalid={!props.isValid}
      id={props.name}
      type={props.type}
      value={props.value}
      onChange={event => props.changeHandler(event, props.name)}
      onBlur={event => props.blurHandler(event, props.name)}
    />
    {
      props.errorMessages.map(message => (
        <span
          className="form__group-error"
          key={`${props.name}-val-err-${message.content.length}`}
          style={{ display: message.validity ? 'none' : 'inherit' }}
        >
          {message.content}
        </span>
      ))
    }
  </label>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  changeHandler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.object).isRequired,

};

export default Input;
