import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions } from '../../store/subscriptionSlice';
import { fetchAdherents, selectAdherents } from '../../store/adherentSlice';
import SubscriptionForm from '../components/SubscriptionForm';

const SubscriptionTablee = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.subscriptions);
  const adherents = useSelector(selectAdherents);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchSubscriptions());
    dispatch(fetchAdherents());
  }, [dispatch]);

  const handleAddSubscription = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="card-title text-primary">Liste des Abonnements</h3>
            <button className="btn btn-primary" onClick={handleAddSubscription}>
              Ajouter un abonnement
            </button>
          </div>

          {loading ? (
            <div className="text-center">Chargement...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Nom de l'adhérent</th>
                  <th>Date de début</th>
                  <th>Durée</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {list.length > 0 ? (
                  list.map((subscription) => {
                    const { _id, startDate, duration, type, adherent } = subscription;
                    const adherentName = adherent
                      ? `${adherent.nom} ${adherent.prenom}`
                      : 'Adhérent inconnu';

                    return (
                      <tr key={_id}>
                        <td>{adherentName}</td>
                        <td>{startDate ? new Date(startDate).toLocaleDateString() : 'Date inconnue'}</td>
                        <td>{duration || 'Durée inconnue'}</td>
                        <td>{type || 'Type inconnu'}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Aucun abonnement trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showForm && (
        <>
          {/* Backdrop manuel */}
          <div className="modal-backdrop fade show"></div>

          <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="subscriptionFormModal"
            aria-hidden="false"
            aria-modal="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Créer un abonnement</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseForm}
                    aria-label="Fermer"
                  ></button>
                </div>
                <div className="modal-body">
                  <SubscriptionForm adherents={adherents} onClose={handleCloseForm} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SubscriptionTablee;
