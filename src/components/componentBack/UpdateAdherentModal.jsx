import React, { useState, useEffect } from 'react';

const UpdateAdherentModal = ({ show, onHide, adherent, onUpdate }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    actif: true,
  });

  useEffect(() => {
    if (adherent) {
      setFormData({
        _id: adherent._id,
        nom: adherent.nom,
        prenom: adherent.prenom,
        email: adherent.email,
        telephone: adherent.telephone,
        actif: adherent.actif,
      });
    }
  }, [adherent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      const { _id, ...dataSansId } = formData;
      onUpdate({ ...dataSansId, id: _id }); 
    }
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" aria-hidden={!show}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Mettre à jour l'adhérent</h5>
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
                <button type="submit" className="btn btn-primary d-inline-block">Mettre à jour</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdherentModal;
