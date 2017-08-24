import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AccordionMenu from '../components/AccordionMenu';


class Menu extends Component {
  constructor(props) {
    super(props);

    this.initialState = this.props.isOpen;
    this.body = document.querySelector('body');

    this.menuElements = [
      { name: 'All notes', icon: 'list', link: '/notes' },
      <AccordionMenu
        key="accordion-menu-filter"
        name="Filter notes"
        icon="filter_list"
        elements={[
          { name: 'Newest', link: '/filter?by=created&newest=true' },
          { name: 'Oldest', link: '/filter?by=created&newest=false' },
          { name: 'Edited', link: '/filter?by=edited' },
          { name: 'Shared', link: '/filter?by=shared' },
        ]}
      />,
      { name: 'New note', icon: 'note_add', link: '/notes/new' },
      { name: 'Home', icon: 'home', link: '/home' },
      { name: 'About', icon: 'info', link: '/about' },
      { name: 'Settings', icon: 'settings', link: '/settings', class: 'menu-item--last' },
    ];
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

  renderMenuItems() {
    return this.menuElements.map((element) => {
      if (React.isValidElement(element)) return element;
      return (
        <li key={`menu-list-${element.name}`} role="menuitem" className="menu-item">
          <Link to={element.link} className={`menu-item__link ${element.class ? element.class : ''}`}>
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
    if (this.initialState && this.props.isOpen) this.body.classList.add('body--push');

    return (
      <nav
        className={`menu ${this.initialState ? 'menu--active menu--open' : ''}`}
        ref={(menu) => { this.menu = menu; }}
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

export default connect(null)(Menu);
