import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchSubscriptions,
  deleteSubscription,
  resetError,
} from '../../store/subscriptionSlice';
import {
  fetchAdherents,
  selectAdherents,
} from '../../store/adherentSlice';
import SubscriptionForm from './SubscriptionForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import SubscriptionCalendar7Days from './SubscriptionCalendar7Days'; 
import { Calendar, Edit, Trash2, CalendarPlus, Table } from 'lucide-react';
import SubscriptionCalendarMonths from './SubscriptionCalendarMonths';
const ITEMS_PER_PAGE = 10;

const SubscriptionList = ({ filterType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state) => state.subscriptions);
  const adherents = useSelector(selectAdherents);

  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);

  const [searchField, setSearchField] = useState('nomPrenom');
  const [searchValue, setSearchValue] = useState('');
  
  // Nouvel état pour afficher le calendrier
  const [showCalendar, setShowCalendar] = useState(false);

  // Chargement des abonnements et adhérents selon filtre et recherche
  useEffect(() => {
    const filters = {};
    if (searchValue) {
      if (searchField === 'nomPrenom') {
        filters.nomPrenom = searchValue;
      } else if (searchField === 'startDate') {
        filters.startDate = searchValue;
      }
    }
    dispatch(fetchSubscriptions(filters));
    dispatch(fetchAdherents());
  }, [dispatch, searchField, searchValue]);

  // Reset page à 1 lors du changement de filtre ou recherche
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, searchValue, searchField]);

  // Ouvre le formulaire d’ajout (reset erreurs)
  const handleOpenForm = () => {
    dispatch(resetError());
    setEditingSubscription(null);
    setShowForm(true);
  };

  // Ouvre le formulaire de modification (reset erreurs)
  const handleEdit = (subscription) => {
    dispatch(resetError());
    setEditingSubscription(subscription);
    setShowForm(true);
  };

  // Prépare la suppression (modale)
  const handleDeleteClick = (subscription) => {
    setSubscriptionToDelete(subscription);
    setShowDeleteModal(true);
  };

  // Confirme suppression et appelle action Redux
  const confirmDelete = () => {
    if (subscriptionToDelete) {
      dispatch(deleteSubscription(subscriptionToDelete._id));
      setShowDeleteModal(false);
      setSubscriptionToDelete(null);
    }
  };

  // Ferme le formulaire (reset erreurs)
  const handleCloseForm = () => {
    dispatch(resetError());
    setShowForm(false);
    setEditingSubscription(null);
  };

  // Navigation pagination
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Filtrer par type puis trier par date de début décroissante (plus récent en premier)
  const filteredList = list
    .filter((sub) => sub.type === filterType)
    .sort((a, b) => {
      const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
      const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
      return dateB - dateA;
    });

  // Pagination
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSubscriptions = filteredList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Pages visibles pour pagination (limité à 5 pages visibles max)
  const visiblePages = (() => {
    const delta = 2;
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    if (totalPages <= 5) {
      start = 1;
      end = totalPages;
    } else if (currentPage <= 3) {
      start = 1;
      end = 5;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 4;
      end = totalPages;
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  })();

  // Si showCalendar est true, afficher le calendrier
  if (showCalendar) {
  const filteredSubscriptions = list.filter((sub) => sub.type === filterType);

  return (
    <>
      <div className="m-6">
        <div
          className="d-flex align-items-center justify-content-between mb-4 mt-4"
          style={{ margin: '20px' }}
        >
          <h2 className="mb-4" style={{ marginTop: '20px' }}>
            <Calendar className="mb-1 me-2" />
            Abonnements - {filterType}
          </h2>

          <button
            className="btn btn-primary"
            style={{ marginTop: '10px' }}
            onClick={() => setShowCalendar(false)}
          >
            ← Retour à la liste
          </button>
        </div>
      </div>

      {filterType === 'mois' ? (
        <SubscriptionCalendarMonths
          filterType={filterType}
          subscriptions={filteredSubscriptions}
          
        />
      ) : (
        <SubscriptionCalendar7Days
          filterType={filterType}
          subscriptions={filteredSubscriptions}
        />
      )}
    </>
  );
}

  // Affichage liste classique
  return (
    <>
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="mb-4 mt-2">
              <Calendar className="mb-1 me-2" />
              Abonnements - {filterType}
            </h2>

            {/* Bouton pour basculer vers le calendrier */}
            <button
              className="btn btn-primary"
              onClick={() => setShowCalendar(true)}
              aria-label="Voir calendrier"
            >
              <Table />
              Voir calendrier
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

            <button
              className="btn btn-success ms-2"
              onClick={handleOpenForm}
              aria-label="Ajouter un abonnement"
            >
              <CalendarPlus />
              <span className="ms-1">Ajouter</span>
            </button>
          </div>

          {loading ? (
            <div className="text-center">Chargement...</div>
          ) : (
            <>
              <div className="text-center mb-2">
                Page {currentPage} sur {totalPages} — {filteredList.length}{' '}
                abonnement{filteredList.length > 1 ? 's' : ''}
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
                        const startDate = subscription.startDate
                          ? new Date(subscription.startDate)
                          : null;
                        const endDate =
                          startDate && subscription.duration
                            ? new Date(
                                startDate.getTime() +
                                  (subscription.type === 'mois'
                                    ? subscription.duration * 86400000 - 86400000
                                    : subscription.duration * 86400000)
                              )
                            : null;

                        const now = new Date();
                        const today = new Date(
                          now.getFullYear(),
                          now.getMonth(),
                          now.getDate()
                        );
                        const isActive = endDate ? endDate >= today : false;

                        return (
                          <tr key={subscription._id}>
                            <td>{startIndex + idx + 1}</td>
                            <td>
                              {subscription.adherent &&
                              (subscription.adherent.nom ||
                                subscription.adherent.prenom)
                                ? `${subscription.adherent.nom || ''} ${
                                    subscription.adherent.prenom || ''
                                  }`.trim()
                                : 'Inconnu'}
                            </td>
                            <td>
                              {startDate ? startDate.toLocaleDateString() : 'Non défini'}
                            </td>
                            <td>{endDate ? endDate.toLocaleDateString() : 'Non défini'}</td>
                            <td>{subscription.type}</td>

                            <td>
                              {isActive ? (
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
                      <button
                        className="page-link"
                        onClick={() => goToPage(1)}
                        aria-label="Première page"
                      >
                        &laquo;
                      </button>
                    </li>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => goToPage(currentPage - 1)}
                        aria-label="Page précédente"
                      >
                        &lsaquo;
                      </button>
                    </li>

                    {visiblePages.map((page) => (
                      <li
                        key={page}
                        className={`page-item ${page === currentPage ? 'active' : ''}`}
                      >
                        <button className="page-link" onClick={() => goToPage(page)}>
                          {page}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => goToPage(currentPage + 1)}
                        aria-label="Page suivante"
                      >
                        &rsaquo;
                      </button>
                    </li>
                    <li
                      className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => goToPage(totalPages)}
                        aria-label="Dernière page"
                      >
                        &raquo;
                      </button>
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
          onClose={handleCloseForm}
          editingSubscription={editingSubscription}
          filterType={filterType}
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

export default SubscriptionList;
