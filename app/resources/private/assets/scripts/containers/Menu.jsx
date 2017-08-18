import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.initialState = this.props.isOpen;
    this.body = document.querySelector('body');
  }

  componentWillReceiveProps({ isOpen }) {
    this.animateBody(isOpen);
    this.animateMenu(isOpen);
  }

  animateBody(state) {
    const body = this.body;
    if (state) {
      body.classList.add('body--push');
    } else if (body.classList.contains('body--push')) {
      window.setTimeout(() => body.classList.remove('body--push'), 150);
    }
  }

  animateMenu(state) {
    const menu = this.menu;
    if (state) {
      menu.classList.add('menu--active');
      window.setTimeout(() => menu.classList.add('menu--open'), 150);
    } else if (menu.classList.contains('menu--active')) {
      menu.classList.remove('menu--open');
      window.setTimeout(() => menu.classList.remove('menu--active'), 150);
    }
  }

  render() {
    // show menu when initial state is true, ignore rule when props are changed
    if (this.initialState && this.props.isOpen) this.body.classList.add('body--push');

    return (
      <nav
        className={`menu ${this.initialState ? 'menu--active menu--open' : ''}`}
        ref={(menu) => { this.menu = menu; }}
      >
        <h2 className="menu__heading">Menu</h2>
        <ul role="menu" className="menu__content">
          <li role="menuitem" className="menu-item">
            <button className="menu-item__button">Recent</button>
          </li>
          <li role="menuitem" className="menu-item">
            <Link to={'/notes'} className="menu-item__link">Notes index</Link>
          </li>
          <li role="menuitem" className="menu-item">
            <Link to={'/notes/new'} className="menu-item__link" >Add a new note</Link>
          </li>
          <li role="menuitem" className="menu-item">
            <button className="menu-item__button">Settings</button>
          </li>
        </ul>
      </nav>
    );
  }
}

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Menu;
