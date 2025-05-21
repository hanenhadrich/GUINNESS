
import React from 'react';
import ContactForm from './ContactForm';
import LocalisationSection from './LocalisationSection';
import '../../../css/App.css';
const ContactSection = () => (
  <section className="contact section-padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-12">
          <h2 className="mb-4" style={{ fontSize: "50px" }}>Contactez-<span>Nous</span></h2>
          <ContactForm />
        </div>

        <div className="col-lg-6 col-12 mt-5 ms-auto">
           <LocalisationSection />
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
<div className="text-center mt-3">
        
      </div>