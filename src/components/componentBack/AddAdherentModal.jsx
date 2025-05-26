import React, { useState, useEffect } from 'react';

const AddAdherentModal = ({ show, onHide, onAdd, error }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
  });

  useEffect(() => {
    if (!show) {
      // reset formulaire quand modal est fermée
      setFormData({ nom: '', prenom: '', email: '', telephone: '' });
    }
  }, [show]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ajouter un adhérent</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onHide} />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">Nom</label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  className="form-control"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">Prénom</label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  className="form-control"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-control ${error?.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {error?.email && <div className="invalid-feedback">{error.email}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="telephone" className="form-label">Téléphone</label>
                <input
                  id="telephone"
                  name="telephone"
                  type="text"
                  className={`form-control ${error?.telephone ? 'is-invalid' : ''}`}
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                />
                {error?.telephone && <div className="invalid-feedback">{error.telephone}</div>}
              </div>

              {error?.general && <div className="alert alert-danger">{error.general}</div>}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>Annuler</button>
              <button type="submit" className="btn btn-primary">Ajouter</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdherentModal;
