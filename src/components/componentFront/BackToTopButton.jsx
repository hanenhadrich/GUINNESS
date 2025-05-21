import React, { useEffect, useState } from 'react';
import { BsArrowUpSquare } from "react-icons/bs";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        title="Go to top"
        className="back-to-top"
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '30px',
          zIndex: 1000,
          display: 'inline-block',
          backgroundColor: '#0A0A6B',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          padding: '12px 15px',
          fontSize: '20px',
          cursor: 'pointer',
          boxShadow: '0px 2px 10px rgba(0,0,0,0.3)'
        }}
      >
        <BsArrowUpSquare/>
      </button>
    )
  );
};

export default BackToTopButton;
