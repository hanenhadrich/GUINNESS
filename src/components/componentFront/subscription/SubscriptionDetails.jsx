import React from "react";
import PropTypes from "prop-types";

const SubscriptionDetails = ({ services }) => {
  return (
    <ul className="list-unstyled text-start mt-3" style={{ paddingLeft: "1rem" }}>
      {services.map((service, index) => (
        <li key={index} className="mb-2 d-flex align-items-center">
          <span style={{ color: "#007bff", marginRight: "0.5rem" }}>•</span>
          <span>{service}</span>
        </li>
      ))}
    </ul>
  );
};

SubscriptionDetails.propTypes = {
  services: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SubscriptionDetails;
