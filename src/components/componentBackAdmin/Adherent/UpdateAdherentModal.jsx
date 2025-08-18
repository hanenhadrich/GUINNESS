import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UpdateAdherentModal = ({ show, onHide, onUpdate, adherent, error }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
  });

  useEffect(() => {
    if (adherent) {
      setFormData({
        nom: adherent.nom || '',
        prenom: adherent.prenom || '',
        email: adherent.email || '',
        telephone: adherent.telephone || '',
      });
    }
  }, [adherent]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isDataChanged = () => {
    return (
      formData.nom !== (adherent.nom || '') ||
      formData.prenom !== (adherent.prenom || '') ||
      formData.email !== (adherent.email || '') ||
      formData.telephone !== (adherent.telephone || '')
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDataChanged()) {
      toast.info("Aucune modification détectée, mise à jour annulée.");
      return;
    }

    const updatedData = {
      _id: adherent._id,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
    };

    onUpdate(updatedData);
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
          <FaEdit className="me-2" />
          Modifier un adhérent
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
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateAdherentModal;