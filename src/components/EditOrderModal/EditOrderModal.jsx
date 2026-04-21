import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';

const statusOptions = [
  "Заказано",
  "Оплачено",
  "Доставлено",
  "Отменен"
];

const EditOrderModal = ({ open, onClose, order, onSave }) => {
  const [status, setStatus] = useState(order.status);
  const [address, setAddress] = useState(order.address);

  const handleSave = () => {
    onSave({ ...order, status, address });
  };

  return (
    <Modal open={open} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>Редактировать заказ #{order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Статус</label>
          <select
            className="form-select"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Адрес</label>
          <input
            className="form-control"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave} appearance="primary">Сохранить</Button>
        <Button onClick={onClose} appearance="subtle">Отмена</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOrderModal;