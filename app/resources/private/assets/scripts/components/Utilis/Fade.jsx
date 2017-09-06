import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const Fade = (props) => {
  const { children } = props;
  return (
    <CSSTransition
      {...props}
      timeout={{ enter: 400, exit: 0 }}
      classNames="fade"
      exit={false}
      appear
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
