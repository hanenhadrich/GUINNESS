import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../css/SubMenu.css";

const SubMenu = ({ item, toggleSidebar }) => {
  const [subnav, setSubnav] = useState(false);
  const closeTimeout = useRef(null);
  const navigate = useNavigate();

  const showSubnav = () => setSubnav(true);
  const hideSubnav = () => {
    closeTimeout.current = setTimeout(() => setSubnav(false), 200); // 200ms delay
  };
  const clearHideTimeout = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  };

 const handleLogout = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Voulez-vous vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, déconnecter',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      localStorage.clear();
      navigate('/home');
    }
  };

  const isLogout = item.title === 'Deconnexion';

  return (
    <div
      className="submenu-wrapper"
      onMouseEnter={() => {
        clearHideTimeout();
        showSubnav();
      }}
      onMouseLeave={hideSubnav}
    >
      <Link
        className="sidebar-link"
        to={item.path || "#"}
        onClick={isLogout ? handleLogout : (item.subNav ? showSubnav : toggleSidebar)}
      >
        <div className="icon-wrapper">
          <div className="icon">{item.icon}</div>
          <span className="sidebar-label">{item.title}</span>
        </div>
        {item.subNav && <div className="icon">{subnav ? item.iconOpened : item.iconClosed}</div>}
      </Link>

      {item.subNav && (
        <div className={`dropdown-container ${subnav ? "open" : ""}`}>
          {item.subNav.map((subItem, index) => (
            <Link
              className="dropdown-link"
              to={subItem.path}
              key={index}
              onClick={toggleSidebar}
            >
              <div className="icon">{subItem.icon}</div>
              <span className="sidebar-label">{subItem.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubMenu;
