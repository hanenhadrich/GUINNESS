import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaUserPlus } from 'react-icons/fa';
import Swal from 'sweetalert2'; 

const AddAdherentModal = ({ show, onHide, onAdd, error }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
  });

  useEffect(() => {
    if (!show) {
      setFormData({ nom: '', prenom: '', email: '', telephone: '' });
    }
  }, [show]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAdd(formData);
      Swal.fire('Succès', 'Adhérent ajouté avec succès !', 'success'); 
      onHide(); 
    } catch (error) {
      
      console.error('Erreur lors de l’ajout:', error);
    }
  };

  const renderErrors = (field) => {
    if (!error || !error[field]) return null;
    if (Array.isArray(error[field])) {
      return error[field].map((msg, idx) => (
        <Form.Control.Feedback key={idx} type="invalid" style={{ display: 'block' }}>
          {msg}
        </Form.Control.Feedback>
      ));
    }
    return (
      <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
        {error[field]}
      </Form.Control.Feedback>
    );
  };

  const renderGeneralErrors = () => {
    if (!error?.general) return null;
    if (Array.isArray(error.general)) {
      return error.general.map((msg, idx) => (
        <div key={idx} className="alert alert-danger py-2 mb-3">
          {msg}
        </div>
      ));
    }
    return <div className="alert alert-danger py-2 mb-3">{error.general}</div>;
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md" backdrop="static" keyboard={false}>
      <Modal.Header className="justify-content-center border-0">
        <Modal.Title className="d-flex align-items-center gap-2 fs-4 fw-bold text-primary">
          <FaUserPlus className="me-2" />
          Ajouter un adhérent
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#f9f9f9' }}>
        {renderGeneralErrors()}
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="nom">
            <Form.Label>Nom*</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaUser /></InputGroup.Text>
              <Form.Control
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                isInvalid={!!error?.nom}
                placeholder="Entrez le nom"
              />
              {renderErrors('nom')}
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4" controlId="prenom">
            <Form.Label>Prénom*</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaUser /></InputGroup.Text>
              <Form.Control
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                isInvalid={!!error?.prenom}
                placeholder="Entrez le prénom"
              />
              {renderErrors('prenom')}
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4" controlId="email">
            <Form.Label>Email*</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaEnvelope /></InputGroup.Text>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!error?.email}
                placeholder="exemple@domaine.com"
              />
              {renderErrors('email')}
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4" controlId="telephone">
            <Form.Label>Téléphone</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaPhone /></InputGroup.Text>
              <Form.Control
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                isInvalid={!!error?.telephone}
                placeholder="+216 XX XXX XXX"
              />
              {renderErrors('telephone')}
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={onHide} style={{ padding: '10px 20px', fontWeight: '600' }}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSubmit} style={{ padding: '10px 20px', fontWeight: '600' }}>
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAdherentModal;
