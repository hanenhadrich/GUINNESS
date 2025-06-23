import React from 'react';

const Header = () => (
  <header className="site-header section-padding-img site-header-image  ">
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-12 header-info">
          <h1>
            <span className="d-block fw-bold" style={{ color: '#0A0A6B', fontSize: '50px' }}>
              Pour toute question
            </span>
            <span className="d-block text-dark fw-bold" style={{ fontSize: '38px', paddingTop: '20px' }}>
              Contactez-Nous
            </span>
          </h1>
        </div>
      </div>
    </div>
    <img src="/assets/images/le-coworking.gif" className="header-image img-fluid" alt="" />
  </header>
);

export default Header;
