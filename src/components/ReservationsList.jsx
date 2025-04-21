import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlusCircle, FaTrash  } from 'react-icons/fa';
import { fetchReservations, createReservation, updateReservation, deleteReservation } from '../store/reservationSlice';

export default function ReservationsList() {
  const dispatch = useDispatch();
  const { list: reservations, loading: reservationLoading, error: reservationError } = useSelector(
    (state) => state.reservations
  );
  const [newReservation, setNewReservation] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);


  const handleAddReservation = (e) => {
    e.preventDefault();
    if (newReservation.trim()) {
      dispatch(createReservation(newReservation));
      setNewReservation('');
    }
  };

 
  const toggleReservationCompletion = (reservation) => {
    dispatch(
      updateReservation({ reservationId: reservation._id, newData: { completed: !reservation.completed } })
    );
  };


  const handleDeleteReservation = (reservation) => {
    dispatch(deleteReservation(reservation._id));
  };

  return (
    <div className="col-xl-6 col-md-12 mb-4">
      <div className="card bg-success text-white">
        <div className="card-body">
          <h5>Réservations</h5>
          <form onSubmit={handleAddReservation} className="mt-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ajouter une réservation"
                value={newReservation}
                onChange={(e) => setNewReservation(e.target.value)}
                style={{ marginRight: '10px', border: 'none' }}
              />
              <button
                type="submit"
                className="btn btn-success mt-2 bg-success"
                style={{ marginBottom: '5px', border: 'none' }}
              >
                <FaPlusCircle size={20} />
              </button>
            </div>
          </form>

          <ul className="list-group list-group-flush mt-3" style={{ borderRadius: '10px' }}>
            {reservationLoading ? (
              <li className="list-group-item">Chargement des réservations...</li>
            ) : reservationError ? (
              <li className="list-group-item text-danger">Erreur : {reservationError}</li>
            ) : reservations.length === 0 ? (
              <li className="list-group-item">Aucune réservation trouvée</li>
            ) : (
              reservations.map((reservation) => (
                <li
                  key={reservation._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span className={reservation.completed ? 'text-decoration-line-through' : ''}>
                    {reservation.title || 'Réservation sans titre'}
                  </span>
                  <div className="d-flex align-items-center">
                    
                  <button
                    type="button"
                    onClick={() => handleDeleteReservation(reservation)}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    <FaTrash />
                  </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
