import React from 'react';

const NavItem = ({ link, icon: Icon, label }) => {
  return (
    <a className="nav-link" href={link}>
      <div className="sb-nav-link-icon">
        <Icon />
      </div>
      {label}
    </a>
  );
};

export default NavItem;
