import React from 'react';
import '../css/index.css'
const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-auto border-top mt-3 ms-3"> 
      <div className="container-fluid px-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-muted">
          <div>© Hanen Riguen 2023</div>
          <div>
            <a href="#" className="text-decoration-none me-2">Privacy Policy</a>
            <span className="text-muted">|</span>
            <a href="#" className="text-decoration-none ms-2">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
