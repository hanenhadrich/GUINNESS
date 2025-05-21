const HeroSection = () => (

  <header className="site-header section-padding-img site-header-image mt-0 mt-lg-5">
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-12 header-info">
          <h1>
            <span className="d-block fw-bold" style={{ color: '#0A0A6B', fontSize: '50px' }}>
            Choisissez
            </span>
            <span className="d-block text-dark fw-bold" style={{ fontSize: '38px', paddingTop: '20px' }}>
            Guinness Co-Working Space
            </span>
          </h1>
        </div>
      </div>
    </div>
    <img src="/assets/images/le-coworking-TITRE.gif" className="header-image img-fluid" alt="" />
  </header>
);

export default HeroSection;
