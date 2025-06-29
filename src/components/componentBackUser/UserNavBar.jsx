
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Swal from "sweetalert2";

const UserNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Voulez-vous vous déconnecter ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/home");
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" ref={navbarRef}>
      <div className="container">
       
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/user"
          onClick={closeMenu}
        >
          <img
            src="/assets/images/GN.png"
            alt="Guinness"
            style={{ height: "40px", marginRight: "10px", borderRadius: "50%" }}
          />
          <strong className="fw-bold" style={{ fontSize: "18px" }}>
            GUINNESS{" "}
            <span className="text-muted">Co-Working Space</span>
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

        
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              <LogOut
                size={22}
                className="text-danger cursor-pointer"
                onClick={handleLogout}
                color="#0A0A6B"
                title="Se déconnecter"
                style={{ cursor: "pointer" }}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
