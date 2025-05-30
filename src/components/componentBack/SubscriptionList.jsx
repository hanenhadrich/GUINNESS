import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions, deleteSubscription, resetError } from '../../store/subscriptionSlice';
import { fetchAdherents, selectAdherents } from '../../store/adherentSlice';
import SubscriptionForm from './SubscriptionForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Calendar, Edit, Trash2 } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const SubscriptionList = ({ filterType }) => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.subscriptions);
  const adherents = useSelector(selectAdherents);

  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);

  // Filtrer par type
  const filteredList = list.filter((sub) => sub.type === filterType);
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSubscriptions = filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchSubscriptions());
    dispatch(fetchAdherents());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleOpenForm = () => {
    dispatch(resetError());
    setEditingSubscription(null);
    setShowForm(true);
  };

  const handleEdit = (subscription) => {
    dispatch(resetError());
    setEditingSubscription(subscription);
    setShowForm(true);
  };

  const handleDeleteClick = (subscription) => {
    setSubscriptionToDelete(subscription);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (subscriptionToDelete) {
      dispatch(deleteSubscription(subscriptionToDelete._id));
      setShowDeleteModal(false);
      setSubscriptionToDelete(null);
    }
  };

  const handleCloseForm = () => {
    dispatch(resetError());
    setShowForm(false);
    setEditingSubscription(null);
  };

  // Pagination dynamique — visible max 5 pages autour de la page courante
  const visiblePages = (() => {
    const delta = 2;
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    if (currentPage <= delta) {
      end = Math.min(totalPages, 5);
    }
    if (currentPage + delta > totalPages) {
      start = Math.max(1, totalPages - 4);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  })();

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
          ) : (
            <>
              <div className="text-center mb-2">
                Page {currentPage} sur {totalPages} — {filteredList.length} abonnement{filteredList.length > 1 ? 's' : ''}
              </div>
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
                    {currentSubscriptions.length > 0 ? (
                      currentSubscriptions.map((subscription, idx) => (
                        <tr key={subscription._id}>
                          <td>{startIndex + idx + 1}</td>
                          <td>
                            {subscription.adherent && (subscription.adherent.nom || subscription.adherent.prenom)
                              ? `${subscription.adherent.nom || ''} ${subscription.adherent.prenom || ''}`.trim()
                              : 'Inconnu'}
                          </td>
                          <td>{subscription.startDate ? new Date(subscription.startDate).toLocaleDateString() : 'Non défini'}</td>
                          <td>{subscription.duration || 'N/A'}</td>
                          <td>{subscription.type}</td>
                          <td className="d-flex justify-content-center">
                            <button
                              className="btn btn-warning me-2"
                              onClick={() => handleEdit(subscription)}
                              aria-label={`Modifier abonnement ${subscription._id}`}
                            >
                              <Edit className="me-1" size={18} />
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteClick(subscription)}
                              aria-label={`Supprimer abonnement ${subscription._id}`}
                            >
                              <Trash2 className="me-1" size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>Aucun abonnement trouvé.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <nav aria-label="Pagination abonnements">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(1)} aria-label="Première page">
                      &laquo;
                    </button>
                  </li>
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(currentPage - 1)} aria-label="Page précédente">
                      &lsaquo;
                    </button>
                  </li>

                  {visiblePages.map((page) => (
                    <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => goToPage(page)}>
                        {page}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(currentPage + 1)} aria-label="Page suivante">
                      &rsaquo;
                    </button>
                  </li>
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(totalPages)} aria-label="Dernière page">
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>

      {/* Formulaire d'ajout / modification */}
      {showForm && (
        <SubscriptionForm
          onClose={handleCloseForm}
          editingSubscription={editingSubscription}
          filterType={filterType}
        />
      )}

      {/* Modal suppression */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onDelete={confirmDelete}
          message="Voulez-vous vraiment supprimer cet abonnement ?"
        />
      )}
    </>
  );
};

export default SubscriptionList;
