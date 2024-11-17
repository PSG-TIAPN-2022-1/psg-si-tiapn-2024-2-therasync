import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdDelete } from "react-icons/md";

function ModalExcluirCliente(props) {
    const { cliente } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Button variant="danger" onClick={handleShow} style={{ width: '40px' }}>
        <MdDelete />
    </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deja excluir este cliente permanentemente ?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalExcluirCliente;