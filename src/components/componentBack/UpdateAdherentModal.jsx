import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, clearSuccess } from '../../store/adherentSlice'; // ajuste le chemin

const UpdateAdherentModal = ({ show, onHide, adherent, onUpdate }) => {
  const dispatch = useDispatch();

  // State local du formulaire
  const [formData, setFormData] = useState({
    _id: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    actif: true,
  });

  // Récupération du state Redux pour erreurs, succès et loading
  const { error, success, loading } = useSelector((state) => state.adherents);

  // Lorsqu'on ouvre le modal avec un adherent à modifier, on remplit le form
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

  // Nettoyer erreurs/success à la fermeture du modal
  useEffect(() => {
    if (!show) {
      dispatch(clearError());
      dispatch(clearSuccess());
    }
  }, [show, dispatch]);

  // Gestion changement champs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Pour 'actif', convertir string 'true'/'false' en bool
    if (name === 'actif') {
      setFormData((prev) => ({
        ...prev,
        actif: value === 'true',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Soumission formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(formData);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
      aria-labelledby="updateAdherentModalLabel"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateAdherentModalLabel">
              Mettre à jour l'adhérent
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Fermer"
              onClick={onHide}
            />
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger">
                {Array.isArray(error.general)
                  ? error.general.map((err, i) => <div key={i}>{err}</div>)
                  : error.general || 'Erreur'}
              </div>
            )}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">
                  Nom
                </label>
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
                <label htmlFor="prenom" className="form-label">
                  Prénom
                </label>
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
                <label htmlFor="email" className="form-label">
                  Email
                </label>
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
                <label htmlFor="telephone" className="form-label">
                  Téléphone
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: 'white' }}
                  >
                    <img
                      src="assets/img/tn.png"
                      alt="Drapeau Tunisie"
                      style={{ width: '20px', height: '15px', marginRight: '5px' }}
                    />
                    +216
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="xx xxx xxx"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="actif" className="form-label">
                  Actif
                </label>
                <select
                  id="actif"
                  name="actif"
                  className="form-control"
                  value={formData.actif ? 'true' : 'false'}
                  onChange={handleChange}
                >
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'En cours...' : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdherentModal;
