import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../containers/Header/Header';
import MenuContainer from '../../containers/Header/MenuContainer';

const Layout = ({ children }) => (
  <div>
    <Header />
    <MenuContainer />
    { children }
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
