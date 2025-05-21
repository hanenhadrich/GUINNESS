import React from 'react';

const LocalisationSection = () => {
  return (
    <div className="map_container">
      <div className="map-responsive">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.671736779609!2d10.748156015095148!3d34.73839608042157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301d32b4b430323%3A0x120bbb43647e9d82!2sGuinness%20Co-Working%20Space!5e0!3m2!1sfr!2stn!4v1683623141234!5m2!1sfr!2stn"
        style={{ border: 0, width: '100%', height: '100%' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Guinness Co-Working"
      />

      </div>
    </div>
  );
};

export default LocalisationSection;
