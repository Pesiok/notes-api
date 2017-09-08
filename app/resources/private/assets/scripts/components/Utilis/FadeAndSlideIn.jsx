import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';


const FadeAndSlideIn = (props) => {
  const { children } = props;
  return (
    <CSSTransition
      {...props}
      timeout={{ enter: 300, exit: 300 }}
      classNames="fadeSlideIn"
      appear
    >
      {children}
    </CSSTransition>
  );
};

FadeAndSlideIn.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FadeAndSlideIn;
