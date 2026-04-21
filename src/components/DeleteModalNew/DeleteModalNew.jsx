import React from 'react';
import { Modal, Button } from 'rsuite';
import { useDispatch } from 'react-redux';

const DeleteModal = ({ deleteFunc, open, onClose, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFunc(id));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>Удалить запись</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены, что хотите удалить это?</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete} appearance="primary" color="red">
          Удалить
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
