import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TOGGLE_MENU from '../../actions/ui/menuActions';

const Header = props => (
  <header className="header">
    <div className="header__content">
      <button
        aria-haspopup="true"
        aria-expanded={props.isOpen ? 'true' : 'false'}
        className="header__button material-icons"
        onClick={props.toggleMenu}
      >
        menu
      </button>
      <h1 className="header__heading">NotesMD</h1>
    </div>
  </header>
);

Header.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
