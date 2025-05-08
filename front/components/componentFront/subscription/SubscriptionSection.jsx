import React, { useEffect, useState } from "react";
import SubscriptionDetails from "./SubscriptionDetails";
import '../../../css/card.css';

const subscriptions = [
  {
    title: "JOURNEE",
    price: "5 DT",
    image: "/assets/images/j.png",
    description: [
      "Accès espace Coworking pour une seule journée",
      "Accès 24 H",
      "Accès Internet de qualité professionnelle, Wi-Fi",
      "Nettoyage et entretien",
    ],
  },
  {
    title: "SEMAINE",
    price: "30 DT",
    image: "/assets/images/s.png",
    description: [
      "Accès espace Coworking pendant 7 jours",
      "Accès 24 H/24",
      "Internet haut débit professionnel",
      "Nettoyage quotidien",
      "Accès à l’espace de révision",
    ],
  },
  {
    title: "MOIS",
    price: "110 DT",
    image: "/assets/images/m.png",
    description: [
      "Accès illimité pendant 1 mois",
      "Accès 24 H/24",
      "Connexion Internet stable et rapide",
      "Nettoyage inclus",
      "Accès à toutes les zones : révision, détente, réunion",
    ],
  },
];

const SubscriptionSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="section-padding mt-0" style={{ backgroundColor: "#f0f0f0" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-5 fw-bold text-center" style={{ fontSize: "50px" }}>
              <span>Abonnement</span>
            </h2>
          </div>
          {subscriptions.map((sub, index) => (
            <div className="col-lg-4 col- mb-4" key={index}>
              <div
                className={`card h-100 p-3 shadow-sm animated-card ${loaded ? 'loaded' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }} // animation cascade
              >
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={sub.image}
                    alt={sub.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "20px",
                    }}
                  />
                  <h5 className="mb-1">{sub.title}</h5>
                  <p className="text-muted fw-bold">{sub.price}</p>
                </div>
                <div className="mt-3">
                  <SubscriptionDetails services={sub.description} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
