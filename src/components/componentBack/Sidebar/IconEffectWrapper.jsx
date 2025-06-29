import React from "react";

const IconEffectWrapper = ({ children }) => {
  return (
    <div
      style={{
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </div>
  );
};

export default IconEffectWrapper;
