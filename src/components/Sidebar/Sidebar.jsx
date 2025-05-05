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
            

            <div className="sb-sidenav-menu-heading">Interface</div>
            <NavItem link="/adherent" icon={FaUserCircle} label="Adhérents" />
            <CollapseMenu
              targetId="collapsePages"
              label="Abonnements"
              icon={FaBookOpen}
              subMenus={[
                { label: "Semaine", link: "/login" },
                { label: "Deux Semaines", link: "/register" },
                { label: "Mois", link: "/password" },
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

            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
