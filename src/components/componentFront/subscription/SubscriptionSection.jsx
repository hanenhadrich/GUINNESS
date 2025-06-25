import React, { useEffect, useState } from "react";
import SubscriptionDetails from "./SubscriptionDetails";
import '../../../css/card.css';

const subscriptions = [
  {
    title: "JOURNEE",
    price: "5 DT",
    image: "/assets/images/j.png",
    description: [
      "Accès espace pour une seule journée",
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
      "Accès Coworking pendant 7 jours",
      "Accès 24 H/24",
      "Internet haut débit",
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
      "Internet rapide et stable",
      "Nettoyage inclus",
      "Accès à toutes les zones",
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
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <h2 className="text-center fw-bold mb-5" style={{ fontSize: "40px", color: "#333" }}>
          Nos Abonnements
        </h2>
        <div className="row">
          {subscriptions.map((sub, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                className={`card border-0 shadow-lg h-100 p-4 text-center transition-transform ${loaded ? "opacity-100" : "opacity-0"} ${loaded ? "animate__animated animate__fadeInUp" : ""}`}
                style={{ borderRadius: "1rem", transition: "transform 0.3s ease", animationDelay: `${index * 0.2}s` }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <img
                  src={sub.image}
                  alt={sub.title}
                  className="mx-auto mb-3"
                  style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #eee" }}
                />
                <h4 className="fw-bold mb-2" style={{ color: "#007bff" }}>{sub.title}</h4>
                <p className="text-primary fw-bold mb-3" style={{ fontSize: "1.5rem" }}>{sub.price}</p>
                <SubscriptionDetails services={sub.description} />
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
