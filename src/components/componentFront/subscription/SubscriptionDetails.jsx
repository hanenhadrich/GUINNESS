import React from "react";

const SubscriptionDetails = ({ services }) => (
  <ul className="mb-0 ps-3">
    {services.map((service, index) => (
      <li key={index} className="text-muted small d-flex align-items-center mb-2">
        <i className="bi bi-check2-circle text-warning me-2 " style={{ fontSize: "2rem" }}></i>
        {service}
      </li>
    ))}
  </ul>
);

export default SubscriptionDetails;
