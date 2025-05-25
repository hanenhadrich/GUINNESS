
import React from 'react';
import '../../../css/index.css';
const ContactForm = () => (
  <form className="contact-form row g-3" role="form">
    <div className="col-12">
      <div className="form-floating">
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          placeholder="Nom&Prénom"
          required
        />
        <label htmlFor="name">Nom&Prénom</label>
      </div>
    </div>

    <div className="col-12">
      <div className="form-floating">
        <input
          type="email"
          name="email"
          id="email"
          pattern="[^ @]*@[^ @]*"
          className="form-control"
          placeholder="Email adresse"
          required
        />
        <label htmlFor="email">Email adresse</label>
      </div>
    </div>

    <div className="col-12">
      <div className="form-floating">
        <input
          type="text"
          name="subject"
          id="subject"
          className="form-control"
          placeholder="Sujet"
          required
        />
        <label htmlFor="subject">Sujet</label>
      </div>
    </div>

    <div className="col-12">
      <label htmlFor="telephone" className="form-label d-block">Téléphone</label>
      <div className="input-group">
        <span className="input-group-text" id="phone-addon">
          <img
            src="assets/img/tn.svg"
            alt="Tunisia Flag"
            style={{ width: '20px', height: 'auto', marginRight: '5px' }}
          />
          +216
        </span>
        <input
          type="tel"
          name="telephone"
          id="telephone"
          className="form-control"
          placeholder="Numéro de téléphone"
        />
      </div>
    </div>

    <div className="col-12">
      <div className="form-floating">
        <textarea
          id="message"
          name="message"
          className="form-control"
          placeholder="details..."
          required
          style={{ height: '160px' }}
        ></textarea>
        <label htmlFor="message">details...</label>
      </div>
    </div>

        <button type="submit" className="custom-btn btn-primary d-block mx-auto mt-3">
      Envoyer
    </button>

  </form>
);

export default ContactForm;
