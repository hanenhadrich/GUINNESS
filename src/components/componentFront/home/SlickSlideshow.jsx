
import React from 'react';
import Slider from 'react-slick';


const slides = [
  {
    image: '/assets/images/entre.jpg',
    title: 'Notre Vision',
    text: 'Un espace de travail chaleureux et convivial avec des conditions flexibles.',
    
  },
  {
    image: '/assets/images/boxx.jpg',
    title: 'Notre Service',
    text: 'Nous disposons un open space, de bureaux privés, d’une salle de réunion parfaitement équipée et d’un espace nomade prévu pour la collaboration et l’échange',
    
  },
  {
    image: '/assets/images/salle.jpg',
    title: 'Contact',
    text: 'Pour tout renseignement, réservation, demande de devis ou autre, veuillez nous contacter...',
    
  }
];

const SlickSlideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <section className="slick-slideshow" >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div className="slick-custom" key={index}>
            <img src={slide.image} className="img-fluid" alt={slide.title}  style={{ height: '700px', objectFit: 'cover', width: '100%' }}/>
            <div className="slick-bottom">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-10">
                    <h1 className="slick-title fw-bold" style={{ fontSize: '70px' }} >{slide.title}</h1>
                    <p className="lead text-white mt-lg-3 mb-lg-5" style={{ fontSize: '30px' }}>{slide.text}</p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default SlickSlideshow;
