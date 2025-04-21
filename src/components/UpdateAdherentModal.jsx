import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { ContactRound } from 'lucide-react';
const UpdateAdherentModal = ({ show, onHide, adherent, onUpdate }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (adherent) {
      setFormData(adherent);
    }
  }, [adherent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <div className="d-flex align-items-center">
          <ContactRound className="me-2 mt-2 text-primary" size={28} />
          <Modal.Title>Mettre à jour l'adhérent</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNom">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="nom"
              value={formData.nom || ''}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPrenom">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              name="prenom"
              value={formData.prenom || ''}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formTelephone">
            <Form.Label>Téléphone</Form.Label>
            <InputGroup>
            <InputGroup.Text>
              <img
                src="assets/img/tn.png"
                alt="Tunisie"
                style={{ width: '20px', height: '14px', marginRight: '6px' }}
              />
              +216
            </InputGroup.Text>
            <Form.Control
              type="text"
              name="telephone"
              value={formData.telephone || ''}
              onChange={handleInputChange}
            />
            </InputGroup>
          </Form.Group>

          <Modal.Footer className="d-flex justify-content-center" >
            <Button variant="secondary" onClick={onHide}>Annuler</Button>
            <Button variant="primary" type="submit">Mettre à jour</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateAdherentModal;
