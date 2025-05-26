import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAdherents,
  deleteAdherent,
  updateAdherent,
  createAdherent,
  clearError,
  clearSuccess,
} from '../../store/adherentSlice';
import ListAdherents from '../../components/componentBack/ListAdherents';
import DeleteConfirmationModal from '../../components/componentBack/DeleteConfirmationModal';
import UpdateAdherentModal from '../../components/componentBack/UpdateAdherentModal';
import AddAdherentModal from '../../components/componentBack/AddAdherentModal';
import { Users, UserPlus } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adherents = () => {
  const dispatch = useDispatch();
  const { list = [], loading, error, success } = useSelector((state) => state.adherents);

  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [adherentToDelete, setAdherentToDelete] = useState(null);
  const [adherentToUpdate, setAdherentToUpdate] = useState(null);

  const [searchField, setSearchField] = useState('nom');
  const [searchValue, setSearchValue] = useState('');

  const [addError, setAddError] = useState(null);

  useEffect(() => {
    dispatch(fetchAdherents());
  }, [dispatch]);

  useEffect(() => {
    if (error && !addError) {
      if (Array.isArray(error)) {
        error.forEach((msg) => toast.error(msg));
      } else if (typeof error === 'object' && error.message) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
      dispatch(clearError());
    }

    if (success) {
      toast.success(success);
      dispatch(clearSuccess());
    }
  }, [error, success, dispatch, addError]);

  const filteredAdherents = useMemo(() => {
    if (!searchValue) return list;
    return list.filter((adh) => {
      const val = adh[searchField];
      if (!val) return false;
      return val.toString().toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [list, searchField, searchValue]);

  const handleDelete = async () => {
    if (!adherentToDelete) return;
    try {
      await dispatch(deleteAdherent(adherentToDelete)).unwrap();
      setShowModal(false);
      setAdherentToDelete(null);
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleUpdate = async (updatedAdherent) => {
    try {
      await dispatch(updateAdherent(updatedAdherent)).unwrap();
      setShowUpdateModal(false);
      setAdherentToUpdate(null);
    } catch {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleAdd = async (newAdherent) => {
    try {
      setAddError(null);
      await dispatch(createAdherent(newAdherent)).unwrap();
      setShowAddModal(false);
    } catch (err) {
      console.log("Erreur brute reçue dans handleAdd:", err);

      // Souvent, l'erreur est dans err.response.data avec axios
      const responseData = err?.response?.data || err;

      if (Array.isArray(responseData)) {
        const errorsObj = {};
        responseData.forEach(msg => {
          if (msg.toLowerCase().includes('email')) {
            errorsObj.email = errorsObj.email ? [...errorsObj.email, msg] : [msg];
          } else if (msg.toLowerCase().includes('téléphone') || msg.toLowerCase().includes('telephone')) {
            errorsObj.telephone = errorsObj.telephone ? [...errorsObj.telephone, msg] : [msg];
          } else {
            errorsObj.general = errorsObj.general ? errorsObj.general + " " + msg : msg;
          }
        });
        setAddError(errorsObj);
      } else if (typeof responseData === 'string') {
        // On split si plusieurs messages collés
        const messages = responseData.split('.').filter(Boolean).map(m => m.trim() + '.');
        setAddError({ general: messages });
      } else if (typeof responseData === 'object' && responseData !== null) {
        setAddError(responseData);
      } else {
        setAddError({ general: ["Erreur inconnue lors de l'ajout."] });
      }
    }
  };

  return (
    <main className="container-fluid px-4" style={{ margin: '10px' }}>
      <div className="card shadow-lg mb-4" style={{ marginLeft: '40px', marginRight: '40px' }}>
        <div className="container mt-3">
          <h2 className="mb-4">
            <Users className="mb-1 me-2" />
            Gestion des Adhérents
          </h2>

          <div className="d-flex mb-2">
            <select
              className="form-select w-auto me-2"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            >
              <option value="nom">Nom</option>
              <option value="prenom">Prénom</option>
              <option value="email">Email</option>
              <option value="telephone">Téléphone</option>
            </select>

            <input
              type="search"
              className="form-control"
              placeholder="Recherche"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <button
              className="btn btn-success ms-2"
              onClick={() => {
                setShowAddModal(true);
                setAddError(null);
              }}
              aria-label="Ajouter un adhérent"
            >
              <UserPlus />
              <span className="ms-1">Ajouter</span>
            </button>
          </div>

          <ListAdherents
            adherents={filteredAdherents}
            loading={loading}
            onDelete={(adh) => {
              setAdherentToDelete(adh);
              setShowModal(true);
            }}
            onUpdate={(adh) => {
              setAdherentToUpdate(adh);
              setShowUpdateModal(true);
            }}
          />

          {showModal && adherentToDelete && (
          <DeleteConfirmationModal
            show={showModal}
            onHide={() => {
              setShowModal(false);
              setAdherentToDelete(null);
            }}
            onDelete={handleDelete}
            
          />
        )}


          {showUpdateModal && adherentToUpdate && (
            <UpdateAdherentModal
              show={showUpdateModal}
              onHide={() => {
                setShowUpdateModal(false);
                setAdherentToUpdate(null);
              }}
              adherent={adherentToUpdate}
              onUpdate={handleUpdate}
            />
          )}

          <AddAdherentModal
            show={showAddModal}
            onHide={() => {
              setShowAddModal(false);
              setAddError(null);
            }}
            onAdd={handleAdd}
            error={addError}
          />

          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </div>
    </main>
  );
};

export default Adherents;
