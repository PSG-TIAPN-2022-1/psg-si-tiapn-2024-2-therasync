import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdDelete } from "react-icons/md";

function ModalExcluirGanho({ganho}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleExcluir = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/financasCreditos/${ganho.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir ganho");
      }

      const data = await response.json();
      console.log("excluído:", data);
      alert("excluído com sucesso!");

      handleClose(); // Fecha o modal após a exclusão
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
      alert("Erro ao excluir paciente!");
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow} style={{ width: '40px' }}>
        <MdDelete />
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir ganho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir {ganho.nome} permanentemente?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleExcluir}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalExcluirGanho;