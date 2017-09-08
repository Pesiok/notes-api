import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';


const FadeAndSlideIn = (props) => {
  const { children } = props;
  return (
    <CSSTransition
      {...props}
      timeout={{ enter: 300, exit: 0 }}
      classNames="fadeSlideIn"
      exit={false}
      appear
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

FadeAndSlideIn.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FadeAndSlideIn;
