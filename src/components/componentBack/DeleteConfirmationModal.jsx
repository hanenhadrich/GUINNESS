import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, onHide, onDelete }) => {
  
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <div className="d-flex justify-content-center mb-3">
          <img src="assets/img/supprimer.png" alt="supprimer" width="80" />
        </div>
        <h5 className="text-center fw-bold" style={{ fontSize: '30px' }}>
          Êtes-vous sûr ?
        </h5>
        <div className="text-center mt-2">
          <p className="fw-normal" style={{ fontSize: '18px' }}>
            <strong>Vous allez supprimer l'adhérent !!! </strong>
          </p>
         
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={onHide}>
          Annuler
        </Button>
        <Button variant="danger" onClick={onDelete} className="ms-2">
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
