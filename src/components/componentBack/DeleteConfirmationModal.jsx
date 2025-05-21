import React from 'react';
import { Modal, Button } from 'react-bootstrap'; 
import { Trash } from 'lucide-react'; 

const DeleteConfirmationModal = ({ show, onHide, onDelete, adherentName, adherentFirstName }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <div className="d-flex justify-content-center mb-3">
          <img src="assets/img/supprimer.png" alt="supprimer" width="80" />
        </div>
        <h5 className="text-center font-weight-bold" style={{ fontSize: '30px' }}>
          Êtes-vous sûr ?
        </h5>
        <div className="text-center mt-2">
          <p className="font-weight-normal" style={{ fontSize: '18px' }}>
            <strong>Vous allez supprimer l'adhérent : </strong>
          </p>
          <p className="font-weight-normal" style={{ fontSize: '16px' }}>
            {adherentName} {adherentFirstName}
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
