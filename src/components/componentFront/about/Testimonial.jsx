import React from 'react';
import { FaCheckSquare } from 'react-icons/fa';

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
    <section className="testimonial section-padding" style={{ backgroundColor: '#f8f9fa', padding: '60px 0' }}>
      <div className="container">
      
         <h2 className="text-center fw-bold" style={{ fontSize: '40px' }}>
          Trouvez<br/> <span>l’espace de travail </span>  qui vous inspire
        </h2>
        <p className="lead text-center mb-5">
          Notre Co-working space est équipé pour vous accueillir dans des conditions flexibles, nous mettons à votre disposition :
        </p>

        <div className="row g-4 justify-content-center">
          {items.map((item, index) => (
            <div key={index} className="col-12 col-md-6 d-flex align-items-center">
              <div
                className="d-flex align-items-center p-3 w-100 shadow-sm bg-white rounded"
                style={{ minHeight: '70px' }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#0A0A6B',
                    color: 'white',
                    marginRight: '15px',
                    flexShrink: 0,
                  }}
                >
                  <FaCheckSquare size={24} />
                </div>
                <span className="fw-medium">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
