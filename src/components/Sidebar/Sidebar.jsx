import React from 'react';
import NavItem from './NavItem';
import CollapseMenu from './CollapseMenu';
import { FaTachometerAlt, FaColumns, FaBookOpen, FaTable, FaAngleDown, FaUserCircle } from 'react-icons/fa';


const Sidebar = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <NavItem link="/home" icon={FaTachometerAlt} label="Dashboard" />
            <NavItem link="/adherent" icon={FaUserCircle} label="Adhérents" />

            <div className="sb-sidenav-menu-heading">Interface</div>
            <CollapseMenu
              targetId="collapseLayouts"
              label="Layouts"
              icon={FaColumns}
              subMenus={[
                { label: "Static Navigation", link: "/unauthorized401" },
                { label: "Light Sidenav", link: "/layout-sidenav-light" },
              ]}
            />

            <CollapseMenu
              targetId="collapsePages"
              label="Pages"
              icon={FaBookOpen}
              subMenus={[
                { label: "Login", link: "/login" },
                { label: "Register", link: "/register" },
                { label: "Forgot Password", link: "/password" },
              ]}
            />

            <CollapseMenu
              targetId="pagesCollapseError"
              label="Error"
              icon={FaAngleDown}  
              subMenus={[
                { label: "401 Page", link: "/unauthorized401" },
                { label: "404 Page", link: "/unauthorized404" },
                { label: "500 Page", link: "/unauthorized500" },
              ]}
            />

            <div className="sb-sidenav-menu-heading">Addons</div>
           
            <NavItem link="/tables" icon={FaTable} label="Tables" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
