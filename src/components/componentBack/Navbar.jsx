import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import '../../css/index.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { to: '/compte', label: 'Dashboard' },
    { to: '/adhernet', label: 'Adhérents' },
    {
      label: 'Abonnements',
      dropdown: true,
      subMenus: [
        { label: 'Semaine', to: '/subscription' },
        { label: 'Deux Semaines', to: '/register' },
        { label: 'Mois', to: '/password' }
      ]
    },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/assets/images/GN.png"
            alt="Guinness"
            style={{ height: '40px', marginRight: '10px', borderRadius: '50%' }}
          />
          <strong className="fw-bold" style={{ fontSize: '18px' }}>
            GUINNESS <span className="text-muted">Co-Working Space</span>
          </strong>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {navItems.map((item, index) =>
              item.dropdown ? (
                <li key={index} className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    id={`dropdown-${index}`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {item.label}
                  </span>
                  <ul className="dropdown-menu" aria-labelledby={`dropdown-${index}`}>
                    {item.subMenus.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link className="dropdown-item" to={subItem.to}>
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={index} className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === item.to ? 'active fw-bold text-primary' : ''}`}
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="d-flex">
            <Link to="/sign-in" className="nav-link">
              <User size={22} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
