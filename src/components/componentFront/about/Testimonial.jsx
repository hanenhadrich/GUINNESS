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
    'Wifi très haute débit',
    'Service de photocopie',
  ];

  return (
    <section className="testimonial section-padding" style={{ marginBottom: '0px' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mx-auto col-11">
            <h2 className="text-center fw-bold" style={{ fontSize: '40px' }}> 
              Trouvez <br /> <span>l’espace de travail</span> qui vous inspire
            </h2>
            <div className="slick-testimonial">
              <div className="slick-testimonial-caption" style={{ paddingBottom: '0' }}>
                <p className="lead fs-3" >
                  Notre Co-working space est équipé pour vous accueillir dans des conditions
                  flexibles, nous mettons à votre disposition :
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container d-flex justify-content-center">
          <div className="row mt-4 justify-content-center" style={{ width: '100%' }}>
            {items.map((item, index) => (
              <div key={index} className="col-md-6 mb-3 d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <FaCheckSquare
                    style={{ fontSize: '30px', marginRight: '10px', color: '#0A0A6B' }}
                  />
                  <p className="mb-0">{item}</p>
                </div>
              </div>
            ))}
          </div>


        </div>



      </div>
    </section>
  );
};

export default Testimonial;
