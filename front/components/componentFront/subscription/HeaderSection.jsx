import React from "react";

const HeaderSection = () => (
  <header className="site-header section-padding-img site-header-image ">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-12 header-info">
          <h1>
            <span className="d-block  fw-bold" style={{ color: '#0A0A6B' ,fontSize: '50px'}}>
              Quel que soit le pack
            </span>
            <span className="d-block text-dark fw-bold" style={{ fontSize: '38px', paddingTop: '20px' }}>
              Accès 24 H/24 et 7 J/7
            </span>
          </h1>
        </div>
      </div>
    </div>
    <img src="/assets/images/cp.gif" className="header-image img-fluid" alt="Espace de coworking" style={{ borderLeft: '2px solid #0A0A6B' }} />
  </header>
);

export default HeaderSection;

