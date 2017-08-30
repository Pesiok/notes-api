import React, { Component } from 'react';

import Menu from '../containers/Menu';
import ClickedOutside from './ClickedOutside';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    // bindings
    this.closeMenu = this.closeMenu.bind(this);
  }

  closeMenu() {
    if (this.state.isOpen) {
      this.setState(state => Object.assign({}, state, { isOpen: !state.isOpen }));
    }
  }

  render() {
    return (
      <header className="header">
        <div className="header__content">
          <button
            aria-haspopup="true"
            aria-expanded={this.state.isOpen ? 'true' : 'false'}
            className="header__button material-icons"
            onClick={() => this.setState(state => Object.assign({}, state, {
              isOpen: !state.isOpen,
            }))}
          >
            menu
          </button>
          <h1 className="header__heading">Notes App</h1>
        </div>
        <ClickedOutside on={this.closeMenu} >
          <Menu isOpen={this.state.isOpen} />
        </ClickedOutside>
      </header>
    );
  }
}

export default Header;
