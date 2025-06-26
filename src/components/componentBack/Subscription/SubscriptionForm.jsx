import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { CalendarPlus } from 'lucide-react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSubscription,
  updateSubscription,
  resetError,
  selectSubscriptionsLoading,
} from '../../../store/subscriptionSlice';
import { selectAdherents } from '../../../store/adherentSlice';

function parseDateLocal(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const SubscriptionForm = ({ onClose, editingSubscription, filterType }) => {
  const dispatch = useDispatch();
  const adherents = useSelector(selectAdherents);
  const error = useSelector((state) => state.subscriptions.error);
  const loading = useSelector(selectSubscriptionsLoading);

  const initialFormData = {
    adherentId: '',
    startDate: '',
    endDate: '',
    duration: filterType === 'mois' ? 30 : 7,
    type: filterType || '',
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    dispatch(resetError());
    if (editingSubscription) {
      setFormData({
        adherentId: editingSubscription.adherent?._id || '',
        startDate: editingSubscription.startDate?.substring(0, 10) || '',
        endDate: editingSubscription.endDate?.substring(0, 10) || '',
        duration: editingSubscription.duration || (filterType === 'mois' ? 30 : 7),
        type: editingSubscription.type || filterType || '',
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingSubscription, filterType, dispatch]);

  useEffect(() => {
    if (formData.startDate) {
      const start = parseDateLocal(formData.startDate);
      if (start) {
        const end = new Date(start);
        end.setDate(start.getDate() + Number(formData.duration));
        const calculatedEndDate = end.toISOString().split('T')[0];
        if (calculatedEndDate !== formData.endDate) {
          setFormData((prev) => ({ ...prev, endDate: calculatedEndDate }));
        }
      }
    }
  }, [formData.startDate, formData.duration]);

  useEffect(() => {
    if (error?.message) {
      Swal.fire('Erreur', error.message, 'error');
      const timer = setTimeout(() => dispatch(resetError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const renderErrors = (field) => {
    const rawError = error?.[field];
    if (!rawError) return null;
    const messages = Array.isArray(rawError) ? rawError : [rawError];
    return messages.map((msg, idx) => (
      <Form.Control.Feedback key={idx} type="invalid" style={{ display: 'block' }}>
        {msg}
      </Form.Control.Feedback>
    ));
  };

  const handleChange = (e) => {
    if (error) dispatch(resetError());
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetError());

    if (!formData.startDate) {
      Swal.fire('Erreur', 'La date de début est requise', 'error');
      return;
    }

    const payload = {
      adherent: formData.adherentId,
      startDate: formData.startDate,
      endDate: formData.endDate,
      duration: Number(formData.duration),
      type: formData.type,
    };
    const action = editingSubscription
      ? updateSubscription({ id: editingSubscription._id, data: payload })
      : createSubscription(payload);

    dispatch(action).then((res) => {
      if (res.error) {
        Swal.fire('Erreur', res.payload || 'Erreur lors de la sauvegarde', 'error');
      } else {
        Swal.fire(
          'Succès',
          `Abonnement ${editingSubscription ? 'modifié' : 'ajouté'} avec succès`,
          'success'
        );
        onClose();
      }
    });
  };

  return (
    <Modal show onHide={onClose} centered backdrop="static" keyboard={false}>
      <Modal.Header className="justify-content-center border-0">
        <Modal.Title className="d-flex align-items-center gap-2 fs-4 fw-bold text-primary">
          <CalendarPlus className="me-2" />
          {editingSubscription ? 'Modifier un abonnement' : 'Ajouter un abonnement'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#f9f9f9' }}>
        {error?.message && (
          <Alert variant="danger" className="text-center">
            {error.message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="adherentId">
            <Form.Label>Adhérent</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaUser /></InputGroup.Text>
              <Form.Select
                name="adherentId"
                value={formData.adherentId}
                onChange={handleChange}
                isInvalid={!!error?.adherentId}
                required
              >
                <option value="">-- Choisir un adhérent --</option>
                {adherents.map((adh) => (
                  <option key={adh._id} value={adh._id}>{`${adh.nom} ${adh.prenom}`}</option>
                ))}
              </Form.Select>
              {renderErrors('adherentId')}
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Date de début</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                isInvalid={!!error?.startDate}
                required
              />
              {renderErrors('startDate')}
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="endDate">
            <Form.Label>Date de fin</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                disabled
                required
              />
              {renderErrors('endDate')}
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Durée (jours)</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaClock /></InputGroup.Text>
              <Form.Control
                type="number"
                name="duration"
                min="1"
                value={formData.duration}
                onChange={handleChange}
                isInvalid={!!error?.duration}
                required
              />
              {renderErrors('duration')}
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control type="text" name="type" value={formData.type} disabled />
          </Form.Group>

          <div className="d-flex justify-content-center mt-4">
            <Button variant="secondary" onClick={onClose} className="me-2" disabled={loading}>
              Annuler
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && <Spinner animation="border" size="sm" className="me-2" />}
              {editingSubscription ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SubscriptionForm;
