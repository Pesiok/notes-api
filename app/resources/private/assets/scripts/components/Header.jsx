import React, { Component } from 'react';

import Menu from '../containers/Menu';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
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
        <Menu isOpen={this.state.isOpen} />
      </header>
    );
  }
}

export default Header;
