import React from 'react';
import '../../css/index.css'
const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-auto border-top mt-6 ms-3"> 
      <div className="container-fluid px-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-muted">
          {/* <div>© Hanen Riguen 2025</div> */}
          <div className="col-12 text-center">
            <p className="text-muted small mb-2 fs-6">
              © 2024 Tous droits réservés By <strong className="fw-bold">Hanen Riguen</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
