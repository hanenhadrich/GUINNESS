// AddAdherentModal.jsx
import React, { useState } from 'react';

const AddAdherentModal = ({ show, onHide, onAdd }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    actif: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAdd) {
      onAdd(formData);  // Appel à la fonction onAdd qui va passer les données au parent
      setFormData({ nom: '', prenom: '', email: '', telephone: '', actif: true });  // Réinitialisation du formulaire
    }
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ajouter un adhérent</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telephone" className="form-label">Téléphone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </div>
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
              <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdherentModal;
