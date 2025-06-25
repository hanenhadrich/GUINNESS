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
import ListAdherents from '../../components/componentBack/Adherent/ListAdherents';
import DeleteConfirmationModal from '../../components/componentBack/DeleteConfirmationModal';
import UpdateAdherentModal from '../../components/componentBack//Adherent/UpdateAdherentModal';
import AddAdherentModal from '../../components/componentBack/Adherent/AddAdherentModal';
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
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    dispatch(fetchAdherents());
  }, [dispatch]);

  useEffect(() => {
    
    if (error && !addError && !updateError) {
      if (Array.isArray(error)) {
        error.forEach((msg) => toast.error(msg));
      } else if (typeof error === 'object' && error.message) {
        toast.error(error.message);
      } else if (typeof error === 'object') {
        
        Object.values(error).flat().forEach((msg) => toast.error(msg));
      } else {
        toast.error(error);
      }
      dispatch(clearError());
    }

    if (success) {
      toast.success(success);
      dispatch(clearSuccess());
    }
  }, [error, success, dispatch, addError, updateError]);

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
      setUpdateError(null);
      await dispatch(updateAdherent(updatedAdherent)).unwrap();
      setShowUpdateModal(false);
      setAdherentToUpdate(null);
    } catch (err) {
      
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
        setUpdateError(errorsObj);
      } else if (typeof responseData === 'object' && responseData !== null) {
        setUpdateError(responseData);
      } else if (typeof responseData === 'string') {
        setUpdateError({ general: [responseData] });
      } else {
        setUpdateError({ general: ["Erreur inconnue lors de la mise à jour."] });
      }
    }
  };

  const handleAdd = async (newAdherent) => {
    try {
      setAddError(null);
      await dispatch(createAdherent(newAdherent)).unwrap();
      setShowAddModal(false);
    } catch (err) {
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
      <div className="card shadow-lg mb-4 mx-md-5 mx-0">

        <div className="container mt-3">
          <h2 className="mb-4 mt-2">
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
              setUpdateError(null);
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
                setUpdateError(null);
              }}
              adherent={adherentToUpdate}
              onUpdate={handleUpdate}
              error={updateError}
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
