import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions, deleteSubscription, resetError } from '../../store/subscriptionSlice';
import { fetchAdherents, selectAdherents } from '../../store/adherentSlice';
import SubscriptionForm from './SubscriptionForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Calendar, Edit, Trash2, CalendarPlus } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const SubscriptionListMonths = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.subscriptions);
  const adherents = useSelector(selectAdherents);

  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);

  const [searchField, setSearchField] = useState('nomPrenom');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(fetchAdherents());
  }, [dispatch]);

  useEffect(() => {
    const filters = { type: 'mois' };
    if (searchValue) {
      filters[searchField] = searchValue;
    }
    dispatch(fetchSubscriptions(filters));
  }, [dispatch, searchField, searchValue]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, searchField]);

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
    if (!subscriptionToDelete) return;
    console.log('ID à supprimer:', subscriptionToDelete._id);
    dispatch(deleteSubscription(subscriptionToDelete._id))
      .then((action) => {
        console.log('Résultat suppression:', action);
        if (action.meta.requestStatus === 'fulfilled') {
          dispatch(fetchSubscriptions({ type: 'mois' }));
        }
      });
    setShowDeleteModal(false);
    setSubscriptionToDelete(null);
  };

  const handleCloseForm = () => {
    dispatch(resetError());
    setShowForm(false);
    setEditingSubscription(null);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const isSubscriptionActive = (startDate, duration) => {
    if (!startDate || !duration) return false;
    const endDate = new Date(new Date(startDate).getTime() + duration * 86400000);
    const today = new Date();
    return endDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const getAdherentName = (adherent) => {
    if (!adherent) return 'Inconnu';
    return `${adherent.nom || ''} ${adherent.prenom || ''}`.trim() || 'Inconnu';
  };

  // Filtrer la liste sur type "mois" puis trier par date décroissante
  const filteredList = list
    .filter((sub) => sub.type === 'mois')
    .sort((a, b) => {
      const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
      const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
      return dateB - dateA;
    });

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSubscriptions = filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="mb-4 mt-2">
              <Calendar className="mb-1 me-2" />
              Abonnements - Mois
            </h2>
            <button className="btn btn-success" onClick={handleOpenForm} aria-label="Ajouter un abonnement">
              <CalendarPlus />
              <span className="ms-1">Ajouter</span>
            </button>
          </div>

          <div className="d-flex mb-3">
            <select
              className="form-select w-auto me-2"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            >
              <option value="nomPrenom">Nom & Prénom</option>
              <option value="startDate">Date de début</option>
            </select>

            {searchField === 'startDate' ? (
              <input
                type="date"
                className="form-control"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            ) : (
              <input
                type="search"
                className="form-control"
                placeholder="Recherche"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            )}
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
                      <th>Date de fin</th>
                      <th>Type</th>
                      <th>Disponibilité</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {currentSubscriptions.length > 0 ? (
                      currentSubscriptions.map((subscription, idx) => {
                        const startDate = subscription.startDate ? new Date(subscription.startDate) : null;
                        const endDate = (() => {
                          if (!startDate || !subscription.duration) return null;
                          const d = new Date(startDate);
                          d.setMonth(d.getMonth() + subscription.duration); // ajouter les mois
                          d.setDate(d.getDate() - 1); // retirer 1 jour pour la fin
                          return d;
                        })();

                        return (
                          <tr key={subscription._id}>
                            <td>{startIndex + idx + 1}</td>
                            <td>{getAdherentName(subscription.adherent)}</td>
                            <td>{startDate ? startDate.toLocaleDateString() : 'Non défini'}</td>
                            <td>{endDate ? endDate.toLocaleDateString() : 'Non défini'}</td>
                            <td>{subscription.type}</td>
                            <td>
                              {isSubscriptionActive(subscription.startDate, subscription.duration) ? (
                                <span className="badge bg-success">En cours</span>
                              ) : (
                                <span className="badge bg-danger">Terminé</span>
                              )}
                            </td>
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
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7}>Aucun abonnement trouvé.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <nav aria-label="Pagination abonnements">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => goToPage(1)} aria-label="Première page">&laquo;</button>
                    </li>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => goToPage(currentPage - 1)} aria-label="Page précédente">&lsaquo;</button>
                    </li>
                    {[...Array(totalPages).keys()].map((x) => x + 1).map((page) => (
                      <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => goToPage(page)}>{page}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => goToPage(currentPage + 1)} aria-label="Page suivante">&rsaquo;</button>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => goToPage(totalPages)} aria-label="Dernière page">&raquo;</button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      {showForm && (
        <SubscriptionForm
          filterType="mois"
          show={showForm}
          onClose={handleCloseForm}
          editingSubscription={editingSubscription} // CORRECT ici
        />
      )}

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

export default SubscriptionListMonths;
