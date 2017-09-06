import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const Fade = (props) => {
  const { children } = props;
  return (
    <CSSTransition
      {...props}
      timeout={400}
      classNames="fade"
      exit={false}
      appear
      mountOnEnter
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

Fade.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Fade;
