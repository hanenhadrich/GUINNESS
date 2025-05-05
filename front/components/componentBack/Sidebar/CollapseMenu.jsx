import React from 'react';
import { FaAngleDown } from 'react-icons/fa'; 

const CollapseMenu = ({ targetId, label, icon: Icon, subMenus }) => {
  return (
    <>
      <a
        className="nav-link collapsed"
        href="#"
        data-bs-toggle="collapse"
        data-bs-target={`#${targetId}`}
        aria-expanded="false"
        aria-controls={targetId}
      >
        <div className="sb-nav-link-icon">
          <Icon />
        </div>
        {label}
        <div className="sb-sidenav-collapse-arrow">
          <FaAngleDown />
        </div>
      </a>
      <div className="collapse" id={targetId} aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
        <nav className="sb-sidenav-menu-nested nav">
          {subMenus.map((subMenu, index) => (
            <a key={index} className="nav-link" href={subMenu.link}>
              {subMenu.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default CollapseMenu;
