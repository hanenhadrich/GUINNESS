import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSubscription } from '../../store/subscriptionSlice';
import { FaCalendar, FaUser, FaClock, FaTags } from 'react-icons/fa';

const SubscriptionForm = ({ adherents, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    adherent: '',
    startDate: '',
    type: 'mois',
    customDuration: '', 
  });

  const getDurationFromType = (type, customDuration) => {
    switch (type) {
      case 'semaine':
        return 7;
      case 'mois':
        return 30;
      case 'an':
        return 365;
      case 'autre':
        return Number(customDuration) || 0;
      default:
        return 0;
    }
  };

  const calculateEndDate = (startDate, duration) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + duration);
    return date.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { adherent, startDate, type, customDuration } = formData;

    if (adherent && startDate && type && (type !== 'autre' || customDuration)) {
      const duration = getDurationFromType(type, customDuration);
      const endDate = calculateEndDate(startDate, duration);

      const payload = {
        adherent,
        startDate,
        duration,
        endDate,
        type,
        status: 'active',
      };

      dispatch(createSubscription(payload));
      onClose();
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <div className="mb-3">
        <label htmlFor="adherent" className="form-label">Sélectionner un adhérent</label>
        <div className="input-group">
          <select
            id="adherent"
            name="adherent"
            className="form-control"
            value={formData.adherent}
            onChange={handleChange}
          >
            <option value="">Sélectionner un adhérent</option>
            {adherents?.map((adherent) => (
              <option key={adherent._id} value={adherent._id}>
                {adherent.nom} {adherent.prenom}
              </option>
            ))}
          </select>
          <div className="input-group-text bg-white">
            <FaUser />
          </div>
        </div>
      </div>

     
      <div className="mb-3">
        <label htmlFor="startDate" className="form-label">Date de début</label>
        <div className="input-group">
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="form-control"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <div className="input-group-text bg-white">
            <FaCalendar />
          </div>
        </div>
      </div>

      
      <div className="mb-3">
        <label htmlFor="type" className="form-label">Type</label>
        <div className="input-group">
          <select
            id="type"
            name="type"
            className="form-control"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner le type</option>
            <option value="semaine">Semaine</option>
            <option value="mois">Mois</option>
            <option value="an">An</option>
            <option value="autre">Autre</option>
          </select>
          <div className="input-group-text bg-white">
            <FaTags />
          </div>
        </div>
      </div>

      
      {formData.type === 'autre' && (
        <div className="mb-3">
          <label htmlFor="customDuration" className="form-label">Durée (en jours)</label>
          <div className="input-group">
            <input
              type="number"
              id="customDuration"
              name="customDuration"
              className="form-control"
              value={formData.customDuration}
              onChange={handleChange}
              required
            />
            <div className="input-group-text bg-white">
              <FaClock />
            </div>
          </div>
        </div>
      )}

      <button type="submit" className="btn btn-primary">Ajouter</button>
    </form>
  );
};

export default SubscriptionForm;
