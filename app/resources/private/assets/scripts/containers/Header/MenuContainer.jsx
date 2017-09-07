import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Menu from '../../components/Header/Menu';
import ClickedOutside from '../../components/Utilis/ClickedOutside';

import TOGGLE_MENU from '../../actions/ui/menuActions';


const MenuContainer = ({ isOpen, toggleMenu }) => {
  const closeMenu = () => {
    if (isOpen) toggleMenu();
  };

  return (
    <ClickedOutside on={closeMenu} >
      <Menu isOpen={isOpen} />
    </ClickedOutside>
  );
};

MenuContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    toggleMenu: () => dispatch({ type: TOGGLE_MENU }),
  };
}

function mapStateToProps(state) {
  return {
    isOpen: state.ui.menu.isOpen,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
