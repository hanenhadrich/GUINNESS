import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createReclamation, clearError } from '../../../store/reclamationSlice'; 
import '../../../css/index.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.reclamations);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    sujet: '',
    telephone: '',
    details: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createReclamation(formData)).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Réclamation envoyée avec succès !',
        confirmButtonText: 'OK'
      });

      setFormData({
        nom: '',
        prenom: '',
        email: '',
        sujet: '',
        telephone: '',
        details: '',
      });
    } catch (err) {
      
    }
  };

  return (
    <form className="contact-form row g-3" role="form" onSubmit={handleSubmit}>
      <div className="col-6">
        <div className="form-floating">
          <input
            type="text"
            name="nom"
            id="nom"
            className="form-control"
            placeholder="Nom"
            required
            value={formData.nom}
            onChange={handleChange}
          />
          <label htmlFor="nom">Nom</label>
        </div>
      </div>

      <div className="col-6">
        <div className="form-floating">
          <input
            type="text"
            name="prenom"
            id="prenom"
            className="form-control"
            placeholder="Prénom"
            required
            value={formData.prenom}
            onChange={handleChange}
          />
          <label htmlFor="prenom">Prénom</label>
        </div>
      </div>

      <div className="col-12">
        <div className="form-floating">
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email adresse"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Email adresse</label>
        </div>
      </div>

      <div className="col-12">
        <div className="form-floating">
          <input
            type="text"
            name="sujet"
            id="sujet"
            className="form-control"
            placeholder="Sujet"
            required
            value={formData.sujet}
            onChange={handleChange}
          />
          <label htmlFor="sujet">Sujet</label>
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
            value={formData.telephone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-12">
        <div className="form-floating">
          <textarea
            id="details"
            name="details"
            className="form-control"
            placeholder="Détails..."
            required
            style={{ height: '160px' }}
            value={formData.details}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="details">Détails</label>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mt-2">
          {typeof error === 'object'
            ? Object.entries(error).map(([field, msg]) => (
                <div key={field}>
                  <strong>{field}:</strong> {Array.isArray(msg) ? msg.join(', ') : msg}
                </div>
              ))
            : error}
        </div>
      )}

      <button
        type="submit"
        className="custom-btn btn-primary d-block mx-auto mt-3"
        disabled={loading}
      >
        {loading ? 'Envoi...' : 'Envoyer'}
      </button>
    </form>
  );
};

export default ContactForm;
