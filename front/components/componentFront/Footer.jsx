import React from 'react';
import '../../css/slick.css';
import '../../css/guinnessstyle.css';
import { Facebook, Instagram, MessageCircle, Home, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5">
      <div className="container">

        {/* Réseaux sociaux */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-8 text-center border-bottom border-secondary pb-4">
            <ul className="list-unstyled d-flex justify-content-center gap-3">
              <li>
                <a href="#" className="text-light fs-4">
                  <MessageCircle size={24} />
                </a>
              </li>
              <li>
                <a href="#" className="text-light fs-4">
                  <Instagram size={24} />
                </a>
              </li>
              <li>
                <a href="#" className="text-light fs-4">
                  <Facebook size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sections */}
        <div className="container">
          <div className="row text-muted small">

            <div className="col-12 col-lg-4 mb-4">
              <h5 className="text-white mb-3 fw-bold">About Us</h5>
              <p className="fs-6">
                Espace de travail collaboratif à Sfax, dédié aux entrepreneurs, freelances et étudiants.
              </p>
            </div>

            <div className="col-12 col-lg-4 mb-4">
              <h5 className="text-white mb-3 fw-bold">Sitemap</h5>
              <ul className="list-unstyled fs-6">
                <li className="mb-2"><a href="/home" className="text-muted">Home</a></li>
                <li className="mb-2"><a href="/about" className="text-muted">About</a></li>
                <li className="mb-2"><a href="/abonnement" className="text-muted">Abonnement</a></li>
                <li><a href="/contact" className="text-muted">Contact</a></li>
              </ul>
            </div>

            <div className="col-12 col-lg-4 mb-4">
              <h5 className="text-white mb-3 fw-bold">Contact</h5>
              <ul className="list-unstyled fs-6">
                <li className="mb-2">
                  <Home size={16} className="me-2" />
                  Avenue Majida Boulila, 3027 Sfax, Tunisie
                </li>
                <li className="mb-2">
                  <Phone size={16} className="me-2" />
                  +216 22 183 103 / +216 22 418 008
                </li>
                <li>
                  <Mail size={16} className="me-2" />
                  Guinnesscoworkingspace@gmail.com
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Footer bottom */}
        <div className="row border-top border-secondary pt-3 mt-3 ">
          <div className="col-12 text-center">
            <p className="text-muted small mb-4 fs-6">
              © 2023 All Rights Reserved By <strong className="fw-bold">Hanen Riguen</strong>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
