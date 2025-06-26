import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchReclamations,
  deleteReclamation,
  selectReclamations,
  selectReclamationsLoading,
  selectReclamationsError,
  selectReclamationsSuccess,
  clearError,
  clearSuccess,
} from '../../store/reclamationSlice';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 10;

const ReclamationList = () => {
  const dispatch = useDispatch();
  const reclamations = useSelector(selectReclamations);
  const loading = useSelector(selectReclamationsLoading);
  const error = useSelector(selectReclamationsError);
  const success = useSelector(selectReclamationsSuccess);

  const [currentPage, setCurrentPage] = useState(1);
  const prevCountRef = useRef(reclamations.length); // nombre de réclamations avant

  // Tri alphabétique par nom
  const sortedReclamations = [...reclamations].sort((a, b) =>
    a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' })
  );

  const totalPages = Math.ceil(sortedReclamations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentReclamations = sortedReclamations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    dispatch(fetchReclamations());
  }, [dispatch]);

  // Vérifie les erreurs
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.general || 'Une erreur est survenue',
      }).then(() => dispatch(clearError()));
    }
  }, [error, dispatch]);

  // Vérifie le succès
  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: success,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => dispatch(clearSuccess()));
    }
  }, [success, dispatch]);

  // Vérifie l'ajout d'une nouvelle réclamation
  useEffect(() => {
    if (reclamations.length > prevCountRef.current) {
      const diff = reclamations.length - prevCountRef.current;
      toast.info(`📢 ${diff} nouvelle${diff > 1 ? 's' : ''} réclamation${diff > 1 ? 's' : ''} reçue${diff > 1 ? 's' : ''} !`);
    }
    prevCountRef.current = reclamations.length;
  }, [reclamations]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette réclamation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReclamation(id));
      }
    });
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  return (
    <>
      <div className="text-center mb-2">
        Page {currentPage} sur {totalPages} — {reclamations.length} réclamation
        {reclamations.length > 1 ? 's' : ''} au total
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light text-center">
            <tr>
              <th>#</th>
              <th>Nom & Prénom</th>
              <th>Email</th>
              <th>Sujet</th>
              <th>Détails</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentReclamations.length > 0 ? (
              currentReclamations.map((rec, index) => (
                <tr key={rec._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{rec.nom} {rec.prenom}</td>
                  <td>{rec.email}</td>
                  <td>{rec.sujet}</td>
                  <td>{rec.details}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(rec._id)}
                      aria-label={`Supprimer la réclamation de ${rec.nom}`}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted">Aucune réclamation trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="mt-3" aria-label="Pagination des réclamations">
          <ul className="pagination justify-content-center flex-wrap">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''} d-none d-sm-block`}>
              <button className="page-link" onClick={() => goToPage(1)}>&laquo; Première</button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}>&lt; Précédente</button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => goToPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Suivante &gt;</button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''} d-none d-sm-block`}>
              <button className="page-link" onClick={() => goToPage(totalPages)}>Dernière &raquo;</button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default ReclamationList;
