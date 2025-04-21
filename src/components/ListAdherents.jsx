import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const ListAdherents = ({ adherents, onUpdate, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(adherents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAdherents = adherents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light text-center">
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
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
                  <td>{adherent.telephone}</td>
                  <td>
                    <button 
                      className="btn btn-warning me-2"
                      onClick={() => onUpdate(adherent)}>
                      <Edit className="me-1" size={18} />
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => onDelete(adherent._id)}>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => goToPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default ListAdherents;
