import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AccordionMenu from './AccordionMenu';


class Menu extends Component {
  constructor(props) {
    super(props);

    this.initialState = this.props.isOpen;
    this.animationTimeout = 150;

    this.menuElements = [
      { name: 'All notes', icon: 'list', link: '/notes' },
      <AccordionMenu
        key="accordion-menu-filter"
        name="Filter notes"
        icon="filter_list"
        elements={[
          { name: 'All', link: '/filter' },
          { name: 'Edited', link: '/filter?by=edited' },
          { name: 'Shared by me', link: '/filter?by=shared' },
        ]}
      />,
      { name: 'New note', icon: 'note_add', link: '/notes/new' },
      { name: 'Home', icon: 'home', link: '/' },
      { name: 'About', icon: 'info', link: '/about' },
      { name: 'Settings', icon: 'settings', link: '/settings', class: 'menu-item--last' },
    ];

    // bindings 
    this.getMenu = this.getMenu.bind(this);
  }

  componentDidMount() {
    this.main = document.querySelector('.main');
  }

  componentWillReceiveProps({ isOpen }) {
    this.animateBody(isOpen);
    this.animateMenu(isOpen);
  }

  getMenu(element) {
    if (element) this.menu = element;
  }

  animateBody(state) {
    const main = this.main;
    if (state) {
      main.classList.add('main--push');
    } else if (main.classList.contains('main--push')) {
      window.setTimeout(() => main.classList.remove('main--push'), this.animationTimeout);
    }
  }

  animateMenu(state) {
    const menu = this.menu;
    if (state) {
      menu.classList.add('menu--active');
      window.setTimeout(() => menu.classList.add('menu--open'), this.animationTimeout);
    } else if (menu.classList.contains('menu--active')) {
      menu.classList.remove('menu--open');
      window.setTimeout(() => menu.classList.remove('menu--active'), this.animationTimeout);
    }
  }

  renderMenuItems() {
    return this.menuElements.map((element) => {
      if (React.isValidElement(element)) return element;
      return (
        <li
          key={`menu-list-${element.name}`}
          role="menuitem"
          className={`menu-item ${element.class ? element.class : ''}`}
        >
          <Link to={element.link} className={'menu-item__link'}>
            <span
              aria-hidden="true"
              className="material-icons menu-item__icon"
            >
              {element.icon}
            </span>
            <span className="menu-item__name">{element.name}</span>
          </Link>
        </li>
      );
    });
  }

  render() {
    // show menu when initial state is true, ignore rule when props are changed
    if (this.initialState && this.props.isOpen) this.main.classList.add('main--push');

    return (
      <nav
        className={`menu ${this.initialState ? 'menu--active menu--open' : ''}`}
        ref={this.getMenu}
      >
        <h2 className="menu__heading">Menu</h2>
        <ul role="menu" className="menu__content">
          {this.renderMenuItems()}
        </ul>
      </nav>
    );
  }
}

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Menu;
