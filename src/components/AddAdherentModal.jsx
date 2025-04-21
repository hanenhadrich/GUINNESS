import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { CircleFadingPlus } from 'lucide-react';

const AddAdherentModal = ({ show, onHide, onAdd }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const phoneRegex = /^\+216[24579]\d{7}$/;

    if (!emailRegex.test(formData.email)) {
      setError('Email invalide');
      return false;
    }
    if (!phoneRegex.test(formData.telephone.startsWith('+216') ? formData.telephone : '+216' + formData.telephone)) {
      setError('Numéro de téléphone tunisien invalide');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formattedData = {
      ...formData,
      telephone: formData.telephone.startsWith('+216')
        ? formData.telephone
        : '+216' + formData.telephone,
    };

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onAdd(formattedData);
      setFormData({ nom: '', prenom: '', email: '', telephone: '' });
      onHide();
    } catch (err) {
      setError("Une erreur est survenue lors de l'ajout de l'adhérent.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <div className="d-flex align-items-center">
          <CircleFadingPlus className="me-2 mt-2 text-primary" size={28} />
          <Modal.Title>Ajouter un Adhérent</Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Entrez le nom"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              placeholder="Entrez le prénom"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Exemple@mail.com"
            />
          </Form.Group>
          <Form.Group className="mb-3">
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
                value={formData.telephone}
                onChange={handleChange}
                required
                placeholder="Exemple: 22123456"
              />
            </InputGroup>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Ajout en cours...' : 'Ajouter'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAdherentModal;
