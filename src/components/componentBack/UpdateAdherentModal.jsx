import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateAdherent,
  clearError,
  clearSuccess,
  clearSelectedAdherent,
} from '../../store/adherentSlice';

export default function UpdateAdherentModal({ show, onHide, adherent }) {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.adherents);

  const [formData, setFormData] = useState({
    _id: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    actif: true,
  });

  // Remplir le formulaire quand l'adhérent change
  useEffect(() => {
    if (adherent) {
      setFormData({
        _id: adherent._id,
        nom: adherent.nom || '',
        prenom: adherent.prenom || '',
        email: adherent.email || '',
        telephone: adherent.telephone || '',
        actif: adherent.actif ?? true,
      });
    }
  }, [adherent]);

  // Nettoyer les messages quand on ferme la modale
  useEffect(() => {
    if (!show) {
      dispatch(clearError());
      dispatch(clearSuccess());
    }
  }, [show, dispatch]);

  // Fermer la modale si succès
  useEffect(() => {
    if (success) {
      dispatch(clearSelectedAdherent());
      onHide();
    }
  }, [success, dispatch, onHide]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'actif' ? value === 'true' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAdherent(formData));
  };

  if (!show) return null;

  const renderErrors = (field) => {
    if (!error || typeof error !== 'object') return null;
    const messages = error[field];
    if (!messages) return null;
    return (Array.isArray(messages) ? messages : [messages]).map((msg, i) => (
      <div key={i} className="invalid-feedback d-block">{msg}</div>
    ));
  };

  return (
    <div className="modal d-block" role="dialog" aria-modal="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modifier adhérent</h5>
            <button type="button" className="btn-close" onClick={onHide} />
          </div>
          <div className="modal-body">
            {error?.general && (
              <div className="alert alert-danger">{Array.isArray(error.general) ? error.general.join(', ') : error.general}</div>
            )}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">Nom *</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  className={`form-control ${error?.nom ? 'is-invalid' : ''}`}
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
                {renderErrors('nom')}
              </div>

              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">Prénom *</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  className={`form-control ${error?.prenom ? 'is-invalid' : ''}`}
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
                {renderErrors('prenom')}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${error?.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {renderErrors('email')}
              </div>

              <div className="mb-3">
                <label htmlFor="telephone" className="form-label">Téléphone</label>
                <input
                  type="text"
                  id="telephone"
                  name="telephone"
                  className={`form-control ${error?.telephone ? 'is-invalid' : ''}`}
                  value={formData.telephone}
                  onChange={handleChange}
                />
                {renderErrors('telephone')}
              </div>

              <div className="mb-3">
                <label htmlFor="actif" className="form-label">Actif</label>
                <select
                  id="actif"
                  name="actif"
                  className="form-select"
                  value={formData.actif ? 'true' : 'false'}
                  onChange={handleChange}
                >
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'En cours...' : 'Mettre à jour'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
