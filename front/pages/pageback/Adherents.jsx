import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa'; 
import { fetchAdherents, deleteAdherent, updateAdherent, createAdherent } from '../../store/adherentSlice';
import ListAdherents from '../../components/componentBack/ListAdherents';
import DeleteConfirmationModal from '../../components/componentBack/DeleteConfirmationModal';
import UpdateAdherentModal from '../../components/componentBack/UpdateAdherentModal';
import AddAdherentModal from '../../components/componentBack/AddAdherentModal';
import DashboardLayout from '../../layouts/DashboardLayout';
import {Users, UserPlus } from 'lucide-react';
const Adherents = () => {
  const dispatch = useDispatch();
  const { list = [], loading, error } = useSelector((state) => state.adherents);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [adherentToDelete, setAdherentToDelete] = useState(null);
  const [adherentToUpdate, setAdherentToUpdate] = useState(null);
  const [searchField, setSearchField] = useState('nom');
  const [searchValue, setSearchValue] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchAdherents());
  }, [dispatch]);

  const handleSearch = () => {
    const value = searchValue.trim();
    const params = value ? { [searchField]: value } : {};
    setSearching(true);
    dispatch(fetchAdherents(params)).finally(() => setSearching(false));
  };

  const handleFieldChange = (e) => setSearchField(e.target.value);
  const handleSearchValueChange = (e) => setSearchValue(e.target.value);

  const handleUpdate = (adherent) => {
    setAdherentToUpdate(adherent);
    setShowUpdateModal(true);
  };

  const handleDeleteRequest = (id) => {
    setAdherentToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteAdherent(adherentToDelete));
    setShowModal(false);
    setAdherentToDelete(null);
  };

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  const adherentToDeleteData = list.find(a => a._id === adherentToDelete);

  return (
    <DashboardLayout>
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

            {/* Recherche */}
            <form className="d-flex mb-3 w-100">
              <div className="input-group w-100 d-flex">
                <select
                  className="form-select w-30"
                  value={searchField}
                  onChange={handleFieldChange}
                >
                  <option value="nom">Nom</option>
                  <option value="prenom">Prénom</option>
                  <option value="email">Email</option>
                </select>

                <input
                  type="text"
                  className="form-control w-50"
                  placeholder="Rechercher..."
                  value={searchValue}
                  onChange={handleSearchValueChange}
                />
                <button
                  className="btn btn-primary " 
                  type="button"
                  onClick={handleSearch}
                >
                  <FaSearch />
                </button>
              </div>
            </form>

            {searching && <div className="text-center">Recherche en cours...</div>}

            <ListAdherents
              adherents={list}
              onUpdate={handleUpdate}
              onDelete={handleDeleteRequest}
              error={error}
              loading={loading}
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

        {showUpdateModal && adherentToUpdate && (
          <UpdateAdherentModal
            show={showUpdateModal}
            onHide={() => setShowUpdateModal(false)}
            adherent={adherentToUpdate}
            onUpdate={(updatedAdherent) => {
              const { _id, ...adherentSansId } = updatedAdherent;
              dispatch(updateAdherent({ adherentId: _id, newData: adherentSansId }));
              setShowUpdateModal(false);
            }}
          />
        )}

        {showAddModal && (
          <AddAdherentModal
            show={showAddModal}
            onHide={() => setShowAddModal(false)}
            onAdd={async (newAdherent) => {
              try {
                await dispatch(createAdherent(newAdherent)).unwrap(); // ✅ unwrap pour remonter les erreurs
                setShowAddModal(false); // Fermer que si succès
              } catch (err) {
                throw err; // la modale s’en occupe
              }
            }}
          />
        )}


      </div>
     
    </main>
    </DashboardLayout>

  );
};

export default Adherents;
