// components/AboutTabs.jsx
import React from 'react';

const tabs = [
  {
    id: 'pills-home',
    title: 'Introduction',
    img: '/assets/images/accueil.jpg',
    heading: 'Pourquoi choisir un espace de coworking?',
    text: 'Nos espaces de travail ont été imaginés et créés pour favoriser la créativité, l’imagination et le brainstorming.',
    link: 'about',
    linkText: 'Découvrir nos services'
  },
  {
    id: 'pills-youtube',
    title: 'Espace',
    img: '/assets/images/bureau.jpg',
    heading: 'Espaces de travail',
    text: 'Nous disposons de bureaux privés, d’une salle de réunion parfaitement équipée et d’un espace nomade prévu pour la collaboration et l’échange.',
    link: 'about',
    linkText: 'Découvrir nos espaces'
  },
  {
    id: 'pills-skill',
    title: 'Pack',
    img: '/assets/images/temps.jpg',
    heading: 'Pack de Coworking',
    text: 'Nous vous offrons des solutions dans nos locaux à l’heure, à la journée ou mensuellement. Des solutions idéales pour vous accompagner vers le succès.',
    link: 'products',
    linkText: 'Découvrir nos pack'
  }
];

const AboutTabs = () => (
  <section className="about section-padding" style={{ marginTop: '0' }}>
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="mb-5 fw-bold" style={{ fontSize: '50px' }}>Commencer avec <span>Guinness</span> Co-Working Space</h2>
        </div>

        <div className="col-lg-2 col-12 mt-auto mb-auto">
          <ul className="nav nav-pills mb-5 mx-auto justify-content-center align-items-center" id="pills-tab" role="tablist">
            {tabs.map((tab, index) => (
              <li className="nav-item" role="presentation" key={tab.id}>
                <button
                  className={`fw-bold nav-link ${index === 0 ? 'active' : ''}` }
                  
                  id={`${tab.id}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#${tab.id}`}
                  type="button"
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={index === 0 ? 'true' : 'false'}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-lg-10 col-12">
          <div className="tab-content mt-2" id="pills-tabContent">
            {tabs.map((tab, index) => (
              <div
                className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                id={tab.id}
                role="tabpanel"
                aria-labelledby={`${tab.id}-tab`}
                key={tab.id}
              >
                <div className="row">
                  <div className="col-lg-7 col-12">
                    <img src={tab.img} className="img-fluid" alt="" style={{ height: '400px', objectFit: 'cover', width: '100%' }}/>
                  </div>
                  <div className="col-lg-5 col-12">
                    <div className="d-flex flex-column h-100 ms-lg-4 mt-lg-0 mt-5">
                      <h4 className="mb-3" style={{  padding: '10px 0', color: '#0A0A6B' ,fontSize: '30px'}}>{tab.heading}</h4>
                      <p style={{ textAlign: 'justify' }}>{tab.text}</p>
                      <div className="mt-2 mt-lg-auto">
                        <a href={tab.link} className="custom-link mb-2">
                          {tab.linkText} <i className="bi-arrow-right ms-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutTabs;
