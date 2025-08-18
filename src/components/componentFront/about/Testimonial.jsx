import React from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import '../../../css/Testimonial.css';

const Testimonial = () => {
  const items = [
    'Des bureaux privés parfaitement meublés',
    'Des salles de réunions toute équipées',
    'Des boxes privés',
    'Des salles de révision',
    'Un espace vert de 120 m²',
    'Un accès 24/24 7/7',
    'Wifi très haut débit',
    'Service de photocopie',
  ];

  return (
    <section className="testimonial">
      <div className="container">
        <h2>
          Trouvez<br /><span>l’espace de travail </span> qui vous inspire
        </h2>
        <p className="lead">
          Notre Co-working space est équipé pour vous accueillir dans des conditions flexibles, nous mettons à votre disposition :
        </p>

        <div className="row g-4 justify-content-center">
          {items.map((item, index) => (
            <div key={index} className="col-12 col-md-6 d-flex align-items-center">
              <div className="icon-box animated-card loaded">
                <div className="icon-circle">
                  <FaCheckSquare size={24} />
                </div>
                <span className="icon-text">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;