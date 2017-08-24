import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const handleKeyPress = (event) => {
  const checked = event.target.checked;
  const code = event.which;
  if (code === 13) {
    // eslint-disable-next-line
    event.target.checked = !checked;
  }
};

const renderSubMenu = elements => (
  elements.map(element => (
    <li key={`el-${element.link}`} className="menu-item--accordion__menu-item">
      <Link to={element.link}>{element.name}</Link>
    </li>
  ))
);

const AccordionMenu = props => (
  <li role="menuitem" className="menu-item menu-item--accordion">
    <input
      type="checkbox"
      role="button"
      aria-haspopup="true"
      id="toggle"
      className="visually-hidden menu-item--accordion__input"
      onKeyPress={handleKeyPress}
    />
    <label htmlFor="toggle" className="menu-item--accordion__label" >
      <span
        aria-hidden="true"
        className="material-icons menu-item__icon"
      >
        {props.icon}
      </span>
      <span className="menu-item__name">{props.name}</span>
      <span className="visually-hidden menu-item--accordion__label-expanded-text">expanded</span>
      <span className="visually-hidden menu-item--accordion__label-collapsed-text">collapsed</span>
    </label>
    <div
      role="menu"
      className="menu-item--accordion__menu"
    >
      <ul className="menu-item--accordion__menu-content">
        {renderSubMenu(props.elements)}
      </ul>
    </div>
  </li>
);

AccordionMenu.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default AccordionMenu;

