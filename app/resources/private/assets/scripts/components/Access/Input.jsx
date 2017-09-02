import React from 'react';
import PropTypes from 'prop-types';

const nameHolder = (event) => {
  const value = event.target.value;
  const input = event.target;

  if (value) {
    input.classList.add('form__group-input--has-value');
  } else {
    input.classList.remove('form__group-input--has-value');
  }
};

const Input = props => (
  <label
    className="form__group"
    htmlFor={props.name}
  >
    <input
      className={props.cssClass.input}
      aria-required="true"
      aria-invalid={!props.isValid}
      id={props.name}
      type={props.type}
      value={props.value}
      onChange={event => props.changeHandler(event, props.name)}
      onBlur={(event) => {
        nameHolder(event);
        props.blurHandler(event, props.name);
      }}
    />
    <span className={props.cssClass.name}>
      {props.children}
    </span>
    {
      props.errorMessages.map(message => (
        <span
          className={`form__group-error ${message.validity ? '' : 'form__group-error--active'}`}
          key={`${props.name}-val-err-${message.content.length}`}
        >
          <span
            aria-hidden="true"
            className="material-icons form__group-error-icon"
          >
          error
          </span>
          <span className="form__group-error-name">
            {message.content}
          </span>
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
  cssClass: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Input;
