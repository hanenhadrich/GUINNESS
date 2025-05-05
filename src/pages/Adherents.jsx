import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdherents, deleteAdherent, updateAdherent, createAdherent } from '../store/adherentSlice';
import ListAdherents from '../components/ListAdherents';
import { FaSearch } from 'react-icons/fa'; // Import de l'icône de recherche
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import UpdateAdherentModal from '../components/UpdateAdherentModal';
import AddAdherentModal from '../components/AddAdherentModal';
import Footer from '../components/Footer';

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
    <main className="container-fluid px-4">
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <h3 className="text-primary mb-0">Liste des Adhérents</h3>
              </div>
              <button className="btn btn-primary d-flex align-items-center" onClick={() => setShowAddModal(true)}>
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
                  className="btn btn-primary ms-2" // Ajout d'une marge au bouton
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
