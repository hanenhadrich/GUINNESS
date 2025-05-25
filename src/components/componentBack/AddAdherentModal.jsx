import React, { useState, useEffect, useRef } from 'react';

const initialFormState = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  actif: true,
};

const AddAdherentModal = ({ show, onHide, onAdd, error }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nomRef = useRef();

  useEffect(() => {
    if (show) {
      setFormData(initialFormState);
      setErrors({});
      setTimeout(() => nomRef.current?.focus(), 100);
    }
  }, [show]);

  useEffect(() => {
    if (error && typeof error === 'object') {
      setErrors(error);
    } else {
      setErrors({});
    }
  }, [error]);

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+216)?\s?\d{2}\s?\d{3}\s?\d{3}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const validationErrors = {};
    if (!formData.nom) validationErrors.nom = 'Le nom est requis.';
    if (!formData.prenom) validationErrors.prenom = 'Le prénom est requis.';
    if (!formData.email) {
      validationErrors.email = "L'email est requis.";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "L'email n'est pas valide.";
    }
    if (formData.telephone && !validatePhone(formData.telephone)) {
      validationErrors.telephone = "Le téléphone n'est pas valide.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd(formData);
    } catch {
      // backend errors via error prop
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex={-1} role="dialog" aria-modal="true">
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit} noValidate>
          <div className="modal-header">
            <h5 className="modal-title">Ajouter un adhérent</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Fermer"
              onClick={onHide}
            />
          </div>
          <div className="modal-body">
            {Array.isArray(errors.general) ? (
                errors.general.map((msg, idx) => (
                  <div key={idx} className="alert alert-danger text-center">{msg}</div>
                ))
              ) : (
                errors.general && (
                  <div className="alert alert-danger text-center">{errors.general}</div>
                )
              )}


            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom *
              </label>
              <input
                type="text"
                className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                ref={nomRef}
                autoComplete="off"
                aria-describedby={errors.nom ? 'nom-error' : null}
              />
              {errors.nom && (
                <div id="nom-error" className="invalid-feedback">
                  {errors.nom}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="prenom" className="form-label">
                Prénom *
              </label>
              <input
                type="text"
                className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                autoComplete="off"
                aria-describedby={errors.prenom ? 'prenom-error' : null}
              />
              {errors.prenom && (
                <div id="prenom-error" className="invalid-feedback">
                  {errors.prenom}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                aria-describedby={errors.email ? 'email-error' : null}
              />
              {errors.email && (
                <div id="email-error" className="invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="telephone" className="form-label">
                Téléphone
              </label>
              <input
                type="text"
                className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="+216 XX XXX XXX"
                autoComplete="off"
                aria-describedby={errors.telephone ? 'telephone-error' : null}
              />
              {errors.telephone && (
                <div id="telephone-error" className="invalid-feedback">
                  {errors.telephone}
                </div>
              )}
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="actif"
                name="actif"
                checked={formData.actif}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, actif: e.target.checked }))
                }
              />
              <label className="form-check-label" htmlFor="actif">
                Actif
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Ajout en cours...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdherentModal;
