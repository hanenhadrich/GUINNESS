import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import {
  fetchReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from '../../store/reservationSlice';

export default function ReservationsList() {
  const dispatch = useDispatch();

  const reservations = useSelector((state) => state.reservations.list);
  const loadingFetch = useSelector((state) => state.reservations.loadingFetch);
  const errorFetch = useSelector((state) => state.reservations.errorFetch);

  const [newReservation, setNewReservation] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleAddReservation = (e) => {
    e.preventDefault();
    if (newReservation.trim()) {
      
      dispatch(createReservation({ title: newReservation, completed: false }));
      setNewReservation('');
    }
  };

  const toggleReservationCompletion = (reservation) => {
    dispatch(
      updateReservation({
        reservationId: reservation._id,
        newData: {
          ...reservation,
          completed: !reservation.completed,
        },
      })
    );
  };

  const handleDeleteReservation = (reservation) => {
    dispatch(deleteReservation(reservation._id));
  };

  return (
    <div className="col-xl-6 col-md-12 mb-4">
      <div className="card bg-success text-white">
        <div className="card-body">
          <h5 className="text-white">Réservations</h5>
          <form onSubmit={handleAddReservation} className="mt-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ajouter une réservation"
                value={newReservation}
                onChange={(e) => setNewReservation(e.target.value)}
                style={{ marginRight: '10px', border: 'none' }}
                disabled={loadingFetch}
              />
              <button
                type="submit"
                className="btn btn-success mt-2 bg-success"
                style={{ marginBottom: '5px', border: 'none' }}
                disabled={loadingFetch}
              >
                <FaPlusCircle size={20} />
              </button>
            </div>
          </form>

          <ul className="list-group list-group-flush mt-3" style={{ borderRadius: '10px' }}>
            {loadingFetch ? (
              <li className="list-group-item">Chargement des réservations...</li>
            ) : errorFetch ? (
              <li className="list-group-item text-danger">Erreur : {errorFetch}</li>
            ) : reservations.length === 0 ? (
              <li className="list-group-item">Aucune réservation trouvée</li>
            ) : (
              reservations.map((reservation) => (
                <li
                  key={reservation._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    
                    <span className={reservation.completed ? 'text-decoration-line-through' : ''}>
                      {reservation.title || 'Réservation sans titre'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteReservation(reservation)}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
