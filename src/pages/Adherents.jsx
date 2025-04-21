import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdherents, deleteAdherent, updateAdherent, createAdherent } from '../store/adherentSlice';
import ListAdherents from '../components/ListAdherents';
import { Users, UserPlus } from 'lucide-react';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import UpdateAdherentModal from '../components/UpdateAdherentModal';
import AddAdherentModal from '../components/AddAdherentModal'; // ✅ Import modale ajout
import '../css/index.css';
import Footer from '../components/Footer';

const Adherents = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.adherents);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // ✅ State pour la modale d'ajout
  const [adherentToDelete, setAdherentToDelete] = useState(null);
  const [adherentToUpdate, setAdherentToUpdate] = useState(null);

  useEffect(() => {
    dispatch(fetchAdherents());
  }, [dispatch]);

  const handleUpdate = (adherent) => {
    setAdherentToUpdate(adherent);
    setShowUpdateModal(true);
  };

  const handleDeleteRequest = (id) => {
    setAdherentToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (adherentToDelete) {
      dispatch(deleteAdherent(adherentToDelete));
      setShowModal(false);
      setAdherentToDelete(null);
    }
  };

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  const adherentToDeleteData = list.find(adherent => adherent._id === adherentToDelete);

  return (
    <main className="container-fluid px-4">
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
              <Users className="me-2 text-primary" size={28} />
              <h3 className="card-title text-primary mb-0">Liste des Adhérents</h3>
            </div>

            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => setShowAddModal(true)}
            >
              <UserPlus className="me-2" size={18} />
              Ajouter
            </button>
          </div>

          <ListAdherents
            adherents={list}
            onUpdate={handleUpdate}
            onDelete={handleDeleteRequest}
          />
        </div>
      </div>

      {adherentToDeleteData && (
        <DeleteConfirmationModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onDelete={confirmDelete}
          adherentName={adherentToDeleteData.nom}
          adherentFirstName={adherentToDeleteData.prenom}
        />
      )}

      {adherentToUpdate && (
        <UpdateAdherentModal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          adherent={adherentToUpdate}
          onUpdate={(updatedAdherent) => {
            dispatch(updateAdherent({ adherentId: updatedAdherent._id, newData: updatedAdherent }));
            setShowUpdateModal(false);
          }}
        />
      )}

      {showAddModal && (
        <AddAdherentModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onAdd={(newAdherent) => {
            dispatch(createAdherent(newAdherent));
            setShowAddModal(false);
          }}
        />
      )}
      
    </div>
    <Footer /> 
    </main>
  );
};

export default Adherents;
