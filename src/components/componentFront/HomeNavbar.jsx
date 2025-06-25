import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";

const HomeNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const navItems = [
    { to: "/home", label: "Accueil" },
    { to: "/about", label: "À propos" },
    { to: "/abonnement", label: "Abonnements" },
    { to: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" ref={navbarRef}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMenu}>
          <img
            src="/assets/images/GN.png"
            alt="Guinness"
            style={{ height: "40px", marginRight: "10px", borderRadius: "50%" }}
          />
          <strong className="fw-bold" style={{ fontSize: "18px" }}>
            GUINNESS <span className="text-muted">Co-Working Space</span>
          </strong>
        </Link>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {navItems.map((item) => (
              <li key={item.to} className="nav-item">
                <Link
                  className={`nav-link ${isActive(item.to) ? "active fw-bold text-primary" : ""}`}
                  to={item.to}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="navbar-nav ms-lg-2">
            <li className="nav-item d-flex align-items-center">
              <Link to="/sign-in" className="nav-link" onClick={closeMenu} aria-label="Sign in">
                <User size={22} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
