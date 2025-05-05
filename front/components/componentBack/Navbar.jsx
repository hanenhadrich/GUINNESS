import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaSearch, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('sb-sidenav-toggled', isSidebarOpen);
  }, [isSidebarOpen]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      
      <Link className="navbar-brand ps-3 d-flex align-items-center" to="/" style={{ fontSize: '14px' }}>
        <img
          src="assets/img/GN.png"
          alt="Guinness Co-working Space"
          style={{ height: '40px', borderRadius: '50%', marginRight: '10px' }}
        />
        <div className="d-flex flex-column">
          <span style={{ fontWeight: 'bold', textAlign: 'center' }}>GUINNESS</span>
          <span style={{ fontSize: '12px' }}>CO-WORKING SPACE</span>
        </div>
      </Link>

      
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        onClick={handleSidebarToggle}
      >
        <FaBars /> 
      </button>

      
      <form className="d-none d-md-inline-block ms-auto me-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Rechercher..."
            aria-label="Search"
          />
          <button className="btn btn-primary" type="button" id="btnNavbarSearch">
            <FaSearch />
          </button>
        </div>
      </form>

      
      <ul className="navbar-nav ms-auto me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaUser className="fa-fw" />
          </a>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#!">Paramètres</a></li>
            <li><a className="dropdown-item" href="#!">Historique</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#!">Déconnexion</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
