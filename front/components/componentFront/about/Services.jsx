import React from 'react';

const services = [
  {
    title: "SALLE DE REVISION",
    image: "/assets/images/salle.jpg",
    description:
      "Un espace de travail partagé dans un open space chaleureux et convivial que ce soit pour la journée, la semaine ou bien pour le mois.",
  },
  {
    title: "ESPACE VERT",
    image: "/assets/images/espace-vert.jpg",
    description: "Amélioration de la santé mentale et du bien-être.",
  },
  {
    title: "BUREAU PRIVE",
    image: "/assets/images/bureauprivé.jpg",
    description:
      "Un bureau privé idéal pour les start-ups et les jeunes entrepreneurs ainsi que les multinationales qui ont besoin de s’agrandir encore plus.",
  },
  {
    title: "SALLE DE REUNION",
    image: "/assets/images/reunion.jpg",
    description:
      "Cette salle est équipée d’un écran de projection, d’un système de visio-conférence et d’un tableau blanc et peut accueillir 8 personnes et plus pour du brainstorming.",
  },
];

const Services = () => {
  return (
    <section style={{ marginTop: '0px', marginBottom: '30px' }} >
      <h2 className="text-center fw-bold" style={{ fontSize: '40px' }}>
        Nos <span>services</span>
      </h2>

      <div className="detailss" style={{ marginTop: '0px' }}>
        <div className="container1" style={{ margin: '0px' }}>
          {services.map((service, index) => (
            <div className="box" key={index}>
              <div className="imgBx">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="content">
                <div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
