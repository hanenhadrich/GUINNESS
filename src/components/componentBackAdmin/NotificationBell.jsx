import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReclamations,
  selectUnreadReclamations,
  markReclamationAsRead
} from '../../store/reclamationSlice';
import { useNavigate } from 'react-router-dom';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unreadReclamations = useSelector(selectUnreadReclamations);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchReclamations());
  }, [dispatch]);

  const unreadCount = unreadReclamations.length;

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const goToReclamationsPage = () => {
    setShowDropdown(false);
    navigate("/reclamations");
  };

  const handleClickReclamation = (id) => {
    dispatch(markReclamationAsRead(id));
    setShowDropdown(false);
    navigate(`/reclamations`);
  };

  return (
    <div
      style={{ width: 28, height: 28, position: "relative", cursor: "pointer" }}
      className="d-inline-block"
    >
      <Bell
        size={28}
        color="white"
        onClick={toggleDropdown}
        className="notification-bell-icon"
        title="Notifications"
        aria-label="Notifications"
      />

      {unreadCount > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light"
          style={{ fontSize: "0.65rem", minWidth: 18, minHeight: 18, lineHeight: "17px" }}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      {showDropdown && (
        <div
          className="dropdown-menu dropdown-menu-end show mt-2 shadow-lg"
          style={{
            minWidth: 250,
            maxWidth: 320,
            maxHeight: 320,
            overflowY: 'auto',
            borderRadius: '0.5rem',
            padding: '0.5rem 0',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <h6 className="dropdown-header text-primary  fst-italic fw-bold mb-2 px-3">
            Réclamations non lues
          </h6>

          {unreadCount === 0 && (
            <div className="dropdown-item text-center text-muted small fst-italic px-3">
              Aucune nouvelle réclamation
            </div>
          )}

          {unreadReclamations.slice(0, 5).map((r) => (
            <div
              key={r._id}
              className="dropdown-item small border-bottom d-flex flex-column px-3 py-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleClickReclamation(r._id)}
              title={`Sujet : ${r.sujet}`}
            >
              <strong className="text-dark">{r.nom} {r.prenom}</strong>
              <span className="text-truncate text-muted" style={{ maxWidth: '90%' }}>
                {r.sujet}
              </span>
            </div>
          ))}

          {unreadCount > 5 && (
            <div className="text-center mt-3 px-3">
              <button
                className="btn btn-sm btn-outline-primary w-100"
                onClick={goToReclamationsPage}
              >
                Voir toutes les réclamations
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        .notification-bell-icon:hover {
          transform: scale(1.15);
          transition: transform 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default NotificationBell;
