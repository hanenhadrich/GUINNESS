import React from "react";
import { Link, useLocation } from 'react-router-dom';
import '../../css/index.css';
import { User } from 'lucide-react';
const HomeNavbar = () => {
  const location = useLocation();

  const navItems = [
    { to: '/home', label: 'HOME' },
    { to: '/about', label: 'ABOUT' },
    { to: '/abonnement', label: 'ABONNEMENT' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ marginBottom: '0' }}>
      <div className="container" style={{ paddingBottom: '0' }}>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <img className="imgheader" src="/assets/images/GN.png" alt="guinness co-working space" />
        <Link className="navbar-brand" to="/" style={{ fontSize: '20px' }}>
          <strong className="fw-bold">
            <span>GUINNESS</span> CO-WORKING SPACE
          </strong>
        </Link>

        <div className="d-lg-none">
          <a href="/sign-in" className="bi-person custom-icon me-3"></a>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {navItems.map((item) => (
              <li key={item.to} className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
                  to={item.to}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-none d-lg-block">
          <a href="/sign-in" className="custom-icon me-3">
  <User size={24} />
</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
