import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, onHide, onDelete, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered aria-labelledby="delete-confirmation-title">
      <Modal.Body>
        <div className="d-flex justify-content-center mb-3">
          <img src="/assets/img/supprimer.png" alt="Supprimer" width="80" />
        </div>
        <h5 id="delete-confirmation-title" className="text-center fw-bold" style={{ fontSize: '30px' }}>
          {message || 'Êtes-vous sûr ?'}
        </h5>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={onHide}>
          Annuler
        </Button>
        <Button
          variant="danger"
          onClick={onDelete}
          className="ms-2"
          aria-label="Confirmer la suppression"
        >
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
