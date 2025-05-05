import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions } from '../../store/subscriptionSlice';
import { fetchAdherents, selectAdherents } from '../../store/adherentSlice';
import SubscriptionForm from './SubscriptionForm';
import { Calendar } from 'lucide-react';
import { Edit, Trash2 } from 'lucide-react';
const ITEMS_PER_PAGE = 10;

const SubscriptionList = ({ filterType }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.subscriptions);
  const adherents = useSelector(selectAdherents);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSubscriptions = list.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const filteredList = currentSubscriptions.filter((subscription) => subscription.type === filterType);

  useEffect(() => {
    dispatch(fetchSubscriptions());
    dispatch(fetchAdherents());
  }, [dispatch]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <>
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
              <Calendar className="me-2 text-primary" size={28} />
              <h3 className="card-title text-primary mb-0">Abonnements - {filterType}</h3>
            </div>
            <button className="btn btn-primary" onClick={handleOpenForm}>
              Ajouter un abonnement
            </button>
          </div>

          {loading ? (
            <div className="text-center">Chargement...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light text-center">
                  <tr>
                    <th>#</th>
                    <th>Nom de l'adhérent</th>
                    <th>Date de début</th>
                    <th>Durée (j)</th>
                    <th>Type</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredList.length > 0 ? (
                    filteredList.map((subscription, index) => (
                      <tr key={subscription._id}>
                        <td>{startIndex + index + 1}</td>
                        <td>
                          {subscription.adherent
                            ? `${subscription.adherent.nom} ${subscription.adherent.prenom}`
                            : 'Inconnu'}
                        </td>
                        <td>
                          {subscription.startDate
                            ? new Date(subscription.startDate).toLocaleDateString()
                            : 'Non défini'}
                        </td>
                        <td>{subscription.duration || 'N/A'}</td>
                        <td>{subscription.type}</td>
                        <td className="d-flex justify-content-center">
                          <button className="btn btn-warning me-2">
                            <Edit className="me-1" size={18} />
                          </button>
                          <button className="btn btn-danger">
                            <Trash2 className="me-1" size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-muted">Aucun abonnement trouvé</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-3">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => goToPage(1)}>&laquo; Première</button>
                </li>

                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => goToPage(currentPage - 1)}>&lt; Précédente</button>
                </li>

                {[...Array(totalPages)].slice(
                  Math.max(0, currentPage - 3),
                  Math.min(currentPage + 2, totalPages - 1) + 1
                ).map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Suivante &gt;</button>
                </li>

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => goToPage(totalPages)}>Dernière &raquo;</button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Modal formulaire d'ajout */}
      {showForm && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Créer un abonnement</h5>
                <button type="button" className="btn-close" onClick={handleCloseForm} />
              </div>
              <div className="modal-body">
                <SubscriptionForm
                  adherents={adherents}
                  onClose={handleCloseForm}
                  defaultType={filterType}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionList;
