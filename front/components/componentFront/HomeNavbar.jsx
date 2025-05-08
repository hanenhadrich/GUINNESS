import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import '../../css/index.css';

const HomeNavbar = () => {
  const location = useLocation();

  const navItems = [
    { to: '/home', label: 'Accueil' },
    { to: '/about', label: 'À propos' },
    { to: '/abonnement', label: 'Abonnements' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo */}
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

        {/* Toggle button mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {navItems.map((item) => (
              <li key={item.to} className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === item.to ? 'active fw-bold text-primary' : ''}`}
                  to={item.to}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icône utilisateur */}
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

export default HomeNavbar;
