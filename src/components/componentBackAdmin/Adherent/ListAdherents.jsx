import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const ListAdherents = ({ adherents, onUpdate, onDelete, error, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedAdherents = [...adherents].sort((a, b) =>
    a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' })
  );

  const totalPages = Math.ceil(sortedAdherents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAdherents = sortedAdherents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const formatError = (err) => {
    if (!err) return null;
    if (typeof err === 'string') return err;
    if (typeof err === 'object') return Object.values(err).flat().join(', ');
    return 'Erreur inconnue';
  };

  if (loading) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        Erreur lors du chargement des adhérents : {formatError(error)}
      </div>
    );
  }

  return (
    <>
      {/* <div className="text-center mb-2">
        Page {currentPage} sur {totalPages} — {adherents.length} adhérent{adherents.length > 1 ? 's' : ''} au total
      </div> */}

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light text-center">
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th className="d-none d-md-table-cell">Téléphone</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentAdherents.length > 0 ? (
              currentAdherents.map((adherent, index) => (
                <tr key={adherent._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{adherent.nom}</td>
                  <td>{adherent.prenom}</td>
                  <td>{adherent.email}</td>
                  <td className="d-none d-md-table-cell">{adherent.telephone}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => onUpdate(adherent)}
                      aria-label={`Modifier ${adherent.nom} ${adherent.prenom}`}
                    >
                      <Edit className="me-1" size={18} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(adherent._id)}
                      aria-label={`Supprimer ${adherent.nom} ${adherent.prenom}`}
                    >
                      <Trash2 className="me-1" size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted">Aucun adhérent trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="mt-3" aria-label="Pagination des adhérents">
          <ul className="pagination justify-content-center flex-wrap">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''} d-none d-sm-block`}>
              <button className="page-link" onClick={() => goToPage(1)} aria-label="Première page">
                &laquo; Première
              </button>
            </li>

            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)} aria-label="Page précédente">
                &lt; Précédente
              </button>
            </li>

            {[...Array(totalPages)]
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(currentPage + 2, totalPages - 1) + 1
              )
              .map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => goToPage(i + 1)} aria-label={`Page ${i + 1}`}>
                    {i + 1}
                  </button>
                </li>
              ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)} aria-label="Page suivante">
                Suivante &gt;
              </button>
            </li>

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''} d-none d-sm-block`}>
              <button className="page-link" onClick={() => goToPage(totalPages)} aria-label="Dernière page">
                Dernière &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default ListAdherents;
