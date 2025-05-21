import React, { useState } from 'react';

const AddAdherentModal = ({ show, onHide, onAdd }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    actif: true,
  });

  const [errors, setErrors] = useState({}); 

 
  const validatePhone = (phone) => {
    const phoneRegex = /^(\+216)?\d{2}\s?\d{3}\s?\d{3}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});


    const validationErrors = {};

    if (!formData.nom) validationErrors.nom = "Le nom est requis.";
    if (!formData.prenom) validationErrors.prenom = "Le prénom est requis.";
    if (!formData.email) validationErrors.email = "L'email est requis.";
    if (formData.telephone && !validatePhone(formData.telephone)) validationErrors.telephone = "Le téléphone n'est pas valide.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onAdd(formData); 
      setFormData({ nom: '', prenom: '', email: '', telephone: '', actif: true });
      onHide(); 
    } catch (err) {
      if (err?.message?.includes('email')) {
        setErrors({ email: err.message });
      } else if (err?.message?.includes('téléphone')) {
        setErrors({ telephone: err.message });
      } else if (err?.details) {
        const fieldErrors = {};
        err.details.forEach(detail => {
          const field = detail.path[0];
          fieldErrors[field] = detail.message;
        });
        setErrors(fieldErrors);
      } else {
        alert("Erreur inconnue : " + (err?.message || err));
      }
    }
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" aria-hidden={!show}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ajouter un adhérent</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Nom */}
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">Nom</label>
                <input
                  type="text"
                  className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                  id="nom"
                  name="nom"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
                {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
              </div>

              {/* Prénom */}
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">Prénom</label>
                <input
                  type="text"
                  className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
                  id="prenom"
                  name="prenom"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
                {errors.prenom && <div className="invalid-feedback">{errors.prenom}</div>}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Téléphone */}
              <div className="mb-3">
                <label htmlFor="telephone" className="form-label">Téléphone</label>
                <div className="input-group">
                  <span className="input-group-text" style={{ backgroundColor: 'white' }}>
                    <img
                      src="assets/img/tn.png"
                      alt="Drapeau Tunisie"
                      style={{ width: '20px', height: '15px', marginRight: '5px' }}
                    />
                    +216
                  </span>
                  <input
                    type="tel"
                    className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="xx xxx xxx"
                  />
                </div>
                {errors.telephone && <div className="invalid-feedback d-block">{errors.telephone}</div>}
              </div>

              {/* Actif */}
              <div className="mb-3">
                <label htmlFor="actif" className="form-label">Actif</label>
                <select
                  id="actif"
                  name="actif"
                  className="form-control"
                  value={formData.actif}
                  onChange={handleChange}
                >
                  <option value={true}>Oui</option>
                  <option value={false}>Non</option>
                </select>
              </div>

              
              <div className="text-center">
                <button type="submit" className="btn btn-primary d-inline-block">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdherentModal;
